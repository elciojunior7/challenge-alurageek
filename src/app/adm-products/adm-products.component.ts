import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'alr-adm-products',
  templateUrl: './adm-products.component.html',
  styleUrls: ['./adm-products.component.css']
})
export class AdmProductsComponent implements OnInit {

  products: Product[];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  
  public async listProducts(): Promise<void> {
    this.products = await this.generalService.getAllProducts();
  }

}