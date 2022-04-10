import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Product } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'alr-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {

  productsByCategory: Product[];
  imageBasePath = environment.supabaseImagesUrl;
  loading: boolean = true;
  category: string;
  term: string;
  navigationSubscription: SubscriptionLike;

  constructor(private generalService: GeneralService, private route:ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && this.term) {
        const term = this.route.snapshot.paramMap.get('queryTerm');
        this.assignProductsByPartCategory(term);
      }
    });
  }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');
    const term = this.route.snapshot.paramMap.get('queryTerm');
    if(category)
      this.assignProductsByCategory(category);
    else if(term)
      this.assignProductsByPartCategory(term);
  }

  private async assignProductsByCategory(category: string) {
    this.category = category;
    this.productsByCategory = await this.generalService.getProductByCategory(category);
    this.loading = false;
  }

  private async assignProductsByPartCategory(term: string) {
    this.term = term;
    this.productsByCategory = await this.generalService.getProductByPartCategory(term);
    this.loading = false;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }
}
