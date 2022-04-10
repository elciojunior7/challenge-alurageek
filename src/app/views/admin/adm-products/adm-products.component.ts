import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'alr-adm-products',
  templateUrl: './adm-products.component.html',
  styleUrls: ['./adm-products.component.css']
})
export class AdmProductsComponent implements OnInit {

  products: Product[];
  loading: boolean = true;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  
  public async listProducts(): Promise<void> {
    this.products = await this.generalService.getAllProducts();
    this.loading = false;
  }

}
