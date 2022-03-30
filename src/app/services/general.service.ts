import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // API path
  uriBaseApiProduct = environment.apiUrl + '/products';
  uriBaseApiCategory = environment.apiUrl + '/categories';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) {
    //super();
  }

  getAllProducts(): Product[] {
  // getAllProducts(): Observable<Product[]> {
    // return this.http
    //   .get<Product[]>(this.uriBaseApiProduct);
      // .pipe(
      //   catchError(this.handleError),
      // );
    let index = 0;
    let starwars = [
      new Product(++index, "Yoda", 6000, 1, "Star Wars", "assets/img/starwars/yoda.svg"),
      new Product(++index, "Baby Yoda", 1500, 1, "Star Wars", "assets/img/starwars/babyoda.svg"),
      new Product(++index, "Trooper", 6000, 1, "Star Wars", "assets/img/starwars/stormtrooper.svg"),
      new Product(++index, "Kyle", 6000, 1, "Star Wars", "assets/img/starwars/kyle.svg"),
      new Product(++index, "Darth", 6000, 1, "Star Wars", "assets/img/starwars/darth.svg"),
    ];

    index = 0;
    let stuffs = [
      new Product(++index, "Camiseta Atari", 8000, 3, "Stuffs", "assets/img/stuffs/atari.svg"),
      new Product(++index, "Pikachu", 2500, 3, "Stuffs", "assets/img/stuffs/pikachu.svg"),
      new Product(++index, "Sonic Action Figure", 1500, 3, "Stuffs", "assets/img/stuffs/sonic.svg"),
      new Product(++index, "SNES", 4000, 3, "Stuffs", "assets/img/stuffs/snes.svg"),
      new Product(++index, "Rádio-Relógio", 900, 3, "Stuffs", "assets/img/stuffs/radiorelogio.svg"),
    ];

    index = 0;
    let consoles = [
      new Product(++index, "Gameboy", 2000, 2, "consoles", "assets/img/console/gameboy.svg"),
      new Product(++index, "Nintendo", 5000, 2, "consoles", "assets/img/console/nintendo.svg"),
      new Product(++index, "PlayStation 5", 35000, 2, "consoles", "assets/img/console/ps5.svg"),
      new Product(++index, "X-Box series X", 31000, 2, "consoles", "assets/img/console/xbox_x.svg"),
      new Product(++index, "Switch", 18000, 2, "consoles", "assets/img/console/switch.svg"),
    ];

    return [...starwars, ...consoles, ...stuffs];
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.uriBaseApiProduct}/${id}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http
      .post<any>(this.uriBaseApiProduct, JSON.stringify(product), this.httpOptions)
  }

  deleteProduct(id: number) {
    return this.http
      .delete<Product>(`${this.uriBaseApiProduct}/${id}`, this.httpOptions);
  }

  getProductByCategory(category: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.uriBaseApiProduct}/category/${category}`);
  }

  getAllCategories(): Category[] {
    let index = 0;
    return [
      new Category(++index, "Star Wars"), 
      new Category(++index, "Consoles"), 
      new Category(++index, "Diversos"), 
    ];
  }

}
