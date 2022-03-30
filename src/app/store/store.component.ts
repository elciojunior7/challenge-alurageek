import { Component, OnInit } from '@angular/core';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Product } from '../models/product';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'alr-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  faArrowRight = faArrowRight;
  products: Product[];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  
  public listProducts() {
    this.products = this.generalService.getAllProducts();
    console.log(this.products)
    // this.products.filter
    // this.generalService.getAllProducts().subscribe(products => {
    //   this.products = products;
    // })
  }

}
