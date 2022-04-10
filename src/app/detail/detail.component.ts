import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'alr-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  
  product: Product;
  productsByCategory: Product[] = [];
  imageBasePath = environment.supabaseImagesUrl;
  loading: boolean = true;
  navigationSubscription: SubscriptionLike;

  constructor(private route:ActivatedRoute, private generalService: GeneralService, private router: Router) {
    // hack in order to Angular does something if it calls same route (detail/:id)
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.loading = true;
        this.searchProductByIdRoute();
      }
    });
   }

  ngOnInit(): void {
    this.searchProductByIdRoute();
  }
  
  private searchProductByIdRoute() {
    const idProduct = this.route.snapshot.paramMap.get('id');
    this.assignProduct(parseInt(idProduct));
  }

  private async assignProduct(idProduct: number): Promise<void> {
    this.product = await this.generalService.getProductById(idProduct);
    this.assignProducts(this.product.category);
  }
  
  assignProducts = async (category: string) => {
    const productsByCategory = await this.generalService.getProductByCategory(category);
    this.productsByCategory = productsByCategory.filter((p) => this.product.id !== p.id);
    this.loading = false;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
