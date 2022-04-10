import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'alr-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {

  productsByCategory: Product[] = [];
  imageBasePath = environment.supabaseImagesUrl;
  loading: boolean = true;
  category: string;

  constructor(private generalService: GeneralService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');
    this.assignProductsByCategory(category);
  }

  private async assignProductsByCategory(category: string) {
    this.category = category;
    this.productsByCategory = await this.generalService.getProductByCategory(category);
    this.loading = false;
  }
}
