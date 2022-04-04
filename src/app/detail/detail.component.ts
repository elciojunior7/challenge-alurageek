import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'alr-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  product: Product;
  productsByCategory: Product[] = [];
  imageBasePath = environment.supabaseImagesUrl;

  constructor(private route:ActivatedRoute, private generalService: GeneralService) { }

  ngOnInit(): void {
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
  }

}
