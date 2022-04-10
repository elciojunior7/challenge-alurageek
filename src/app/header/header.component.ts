import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SubscriptionLike } from 'rxjs';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'alr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  faMagnifyingGlass = faMagnifyingGlass;
  navigationSubscription: SubscriptionLike;
  isLogged: boolean;

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

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
