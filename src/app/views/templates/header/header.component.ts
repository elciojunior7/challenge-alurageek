import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SubscriptionLike } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'alr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  navigationSubscription: SubscriptionLike;
  isLogged: boolean;
  isSearch: boolean = false;
  term: string;

  constructor(private router: Router, private generalService: GeneralService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && this.router.url === '/adm-products') {
        this.isLogged = this.generalService.checkLogin() !== (null && undefined);
      }
    });
  }

  ngOnInit(): void {
    this.isLogged = this.generalService.checkLogin() !== (null && undefined);
  }

  logoff(){
    if(this.generalService.logoff()){
      this.isLogged = false;
      this.router.navigate(['/store']);
    }
  }

  setSearch(){
    this.isSearch = !this.isSearch;
  }

  search(){
    if(this.term.trim().length > 0){
      this.router.navigate([`/products/query/${this.term}`]);
      this.term = undefined;
    }else{
      alert("Digite categoria a ser pesquisada");
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
