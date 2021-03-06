import { Component, OnInit } from '@angular/core';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Category, Product } from '../../models/product';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'alr-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  //Ssalura2022
  faArrowRight = faArrowRight;
  productsStarwars: Product[] = [];
  productsStuffs: Product[] = [];
  productsConsoles: Product[] = [];
  loading = true;
  CAT_STARWARS: string = Category.STARWARS.trim();
  CAT_CONSOLES: string = Category.STUFFS;
  CAT_STUFFS: string = Category.CONSOLES;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  
  public async listProducts(): Promise<void> {
    const products = await this.generalService.getAllProducts();
    this.filterProducts(products);
    this.loading = false;
  }

  private filterProducts(products: Product[]): void{
    this.productsStarwars = products.filter((p) => p.category === Category.STARWARS);
    this.productsStuffs = products.filter((p) => p.category === Category.STUFFS);
    this.productsConsoles = products.filter((p) => p.category === Category.CONSOLES);
  }

  scrollToConsoles(){
    document.querySelector('#consoles').scrollIntoView();;
  }
 
}
