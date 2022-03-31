import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, Product } from '../models/product';
import { createClient } from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // API path
  uriBaseApiProduct = environment.apiUrl + '/products';
  uriBaseApiCategory = environment.apiUrl + '/categories';

  supabase;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) {
    //super();
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await this.supabase
        .from('Product')
        .select('*')
        return data;

    // let index = 0;
    // let starwars = [
    //   new Product(++index, "Yoda", 6000, Category.STARWARS, "assets/img/starwars/yoda.svg"),
    //   new Product(++index, "Baby Yoda", 1500, Category.STARWARS, "assets/img/starwars/babyoda.svg"),
    //   new Product(++index, "Trooper", 6000, Category.STARWARS, "assets/img/starwars/stormtrooper.svg"),
    //   new Product(++index, "Kyle", 6000, Category.STARWARS, "assets/img/starwars/kyle.svg"),
    //   new Product(++index, "Darth", 6000, Category.STARWARS, "assets/img/starwars/darth.svg"),
    // ];

    // index = 0;
    // let stuffs = [
    //   new Product(++index, "Camiseta Atari", 8000, Category.STUFFS, "assets/img/stuffs/atari.svg"),
    //   new Product(++index, "Pikachu", 2500, Category.STUFFS, "assets/img/stuffs/pikachu.svg"),
    //   new Product(++index, "Sonic Action Figure", 1500, Category.STUFFS, "assets/img/stuffs/sonic.svg"),
    //   new Product(++index, "SNES", 4000, Category.STUFFS, "assets/img/stuffs/snes.svg"),
    //   new Product(++index, "Rádio-Relógio", 900, Category.STUFFS, "assets/img/stuffs/radiorelogio.svg"),
    // ];

    // index = 0;
    // let consoles = [
    //   new Product(++index, "Gameboy", 2000, Category.CONSOLES, "assets/img/console/gameboy.svg"),
    //   new Product(++index, "Nintendo", 5000, Category.CONSOLES, "assets/img/console/nintendo.svg"),
    //   new Product(++index, "PlayStation 5", 35000, Category.CONSOLES, "assets/img/console/ps5.svg"),
    //   new Product(++index, "X-Box series X", 31000, Category.CONSOLES, "assets/img/console/xbox_x.svg"),
    //   new Product(++index, "Switch", 18000, Category.CONSOLES, "assets/img/console/switch.svg"),
    // ];

    //return [...starwars, ...consoles, ...stuffs];
  }

  async getProductById(id: number): Promise<Product> {
      const { data, error } = await this.supabase
          .from('Product')
          .select('*')
          .eq('id', id);

      return data;
  }

  async addProduct(product: Product): Promise<any> {
    const { data, error } = await this.supabase
      .from('Product')
      .insert([
        { 
          title: product.title, 
          cost: product.cost, 
          category: product.category, 
          imagePath: product.imagePath, 
          // some_column: product.image, 
        },
      ]);

    return data;
  }

  async updateProduct(product: Product): Promise<any> {
    const { data, error } = await this.supabase
      .from('Product')
      .update(
        { 
          title: product.title, 
          cost: product.cost, 
          category: product.category, 
          imagePath: product.imagePath, 
          // some_column: product.image, 
        },
      )
      .eq('id', product.id);
    return data;
  }

  async deleteProduct(id: number) {
    const { data, error } = await this.supabase
      .from('Product')
      .delete()
      .eq('some_column', 'someValue')

    return data;
  }

  async getProductByCategory(category: string): Promise<Product> {
    const { data, error } = await this.supabase
          .from('Product')
          .select('*')
          .eq('category', category);
      return data;
  }

}
