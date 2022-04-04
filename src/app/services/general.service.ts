import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface DataResponse {
  msg: string,
  status: number,
  product: Product
}

type MyError = {
  name?: string,
  message: string,
  details?: string,
  hint?: string,
  code?: string
}

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  
  supabase: SupabaseClient;

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

      return data && data.length === 1 ? data[0] : null; 
  }

  async getProductByCategory(category: string): Promise<Product[]> {
    const { data, error } = await this.supabase
          .from('Product')
          .select('*')
          .eq('category', category);

    return data;
  }

  async addProduct(product: Product): Promise<DataResponse> {
    let myerror: MyError;
    const { data, error } = await this.supabase
      .from('Product')
      .insert([
        { 
          title: product.title, 
          cost: product.cost, 
          category: product.category, 
          imagePath: product.imagePath,
          description: product.description
        },
      ]);

    if(error)
      myerror = {message: error.message};
    return this.handleReturn(null, myerror);
  }

  async updateProduct(product: Product): Promise<DataResponse> {
    let myerror: MyError;
    const { data, error } = await this.supabase
      .from('Product')
      .update(
        { 
          title: product.title, 
          cost: product.cost, 
          category: product.category, 
          imagePath: product.imagePath,
          description: product.description
        },
      )
      .eq('id', product.id);

    if(error)
      myerror = {message: error.message};
    return this.handleReturn(null, myerror);
  }

  async deleteProduct(id: number, filename: string): Promise<DataResponse> {
    let myerror: MyError;
    const { data, error } = await this.supabase
      .from('Product')
      .delete()
      .eq('id', id);

    if(filename)
      await this.deleteImageProduct(filename);

    if(error)
      myerror = {message: error.message};
    return this.handleReturn(null, myerror);
  }

  async addImageAndProduct(file: File, product: Product): Promise<DataResponse> {
    let resp = await this.uploadImageProduct(file);
    let myerror: MyError;
    if(resp.status === 200){
      product.imagePath = resp.info;
      resp = await this.addProduct(product);
    }

    if(resp.status === 500)
      myerror = {message: resp.msg};
    return this.handleReturn(null, myerror, resp.status);
  }

  async updateImageAndProduct(file: File, product: Product): Promise<DataResponse> {
    let resp;
    let myerror: MyError;
    if(file){
      resp = await this.uploadImageProduct(file);
      if(resp.status === 200)
      product.imagePath = resp.info;
    }

    if(!resp || resp.status === 200)
      resp = await this.updateProduct(product);

    if(resp.status === 500)
      myerror = {message: resp.msg};
    return this.handleReturn(null, myerror);
  }

  async uploadImageProduct(file: File): Promise<any> {
    const { data, error } = await this.supabase.storage
      .from('images')
      .upload(`products/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true
      });

    if(data)
      return { info: data.Key, status: 200 };

    return { info: error.message, status: 500 };
  }

  async deleteImageProduct(filename: string): Promise<any> {
    let myerror: MyError;
    const { data, error } = await this.supabase
        .storage
        .from('images')
        .remove([`products/${filename}`]);

    if(error)
      myerror = {message: error.message};
    return this.handleReturn(null, myerror);
  }
      
  private handleReturn(prod: Product, error?: MyError, status?: number){
    if(error){
      console.log(error.message)
      return {msg: "Algo de errado não está certo =/", status: 500, product: prod};
    }

    return {msg: "Sucesso =]", status: status || 200, product: prod};
  }

}
