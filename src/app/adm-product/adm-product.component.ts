import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../models/product';
import { DataResponse, GeneralService } from '../services/general.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'alr-adm-product',
  templateUrl: './adm-product.component.html',
  styleUrls: ['./adm-product.component.css']
})
export class AdmProductComponent implements OnInit {

  selectedFile: File;
  categories: string[];
  product: Product;
  idProduct: string;
  imageBasePath = environment.supabaseImagesUrl;
  loading: boolean = true;

  productForm: FormGroup;

  constructor(private route:ActivatedRoute, 
    private generalService: GeneralService, 
    private router: Router) { }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id');
    if(this.idProduct)
      this.getProduct(parseInt(this.idProduct));
    else
      this.createProduct(new Product());
    this.listCategories();
  }

  createProduct = (prod: Product) => {
    this.product = prod;
    this.productForm = new FormGroup({
      title: new FormControl(prod.title),
      cost: new FormControl(prod.cost),
      description: new FormControl(prod.description),
      category: new FormControl(prod.category),
    })
    this.loading = false;
  }

  private async getProduct(idProduct: number): Promise<void> {
    const product = await this.generalService.getProductById(idProduct);
    this.createProduct(product);
  }

  public onImageChanged(event: any) {
    this.selectedFile = event.target.files[0];
    setTimeout(() => {
      let imagePreview = document.getElementById("imageFile") as HTMLImageElement;
      imagePreview.src = URL.createObjectURL(this.selectedFile);
    }, 1);
  }

  private listCategories(){
    this.categories = Object.entries(Category)
      .map(([key, value]) => (value));
  }

  public async saveProduct(){
    //TODO validacoes
    // console.log(this.productForm.valid);
    // console.log(this.productForm.value); 
    // console.log(this.selectedFile); 

    this.loading = true;

    this.product.title = this.productForm.get('title').value;
    this.product.cost = this.productForm.get('cost').value;
    this.product.description = this.productForm.get('description').value;
    this.product.category = this.productForm.get('category').value;

    if((this.selectedFile || this.product.imagePath) && this.productForm.valid){
      let resp: DataResponse;
      if(this.product.id) {
        const file = this.buildFileImage();
        resp = await this.generalService.updateImageAndProduct(file, this.product);
      } else 
        resp = await this.generalService.addImageAndProduct(this.selectedFile, this.product);

      console.log(resp)
      this.loading = false;  

      alert(resp.msg);
      if(resp.status !== 500)
        this.router.navigate(['/adm-products']);
    }else
      this.loading = false;  
  }

  private buildFileImage() {
    const arrFilename = this.product.imagePath.split('images/products/');
    const filename = arrFilename.length === 2 ? arrFilename[1] : null;
    const file = this.selectedFile?.name.includes(filename) ? null : this.selectedFile;
    return file;
  }
}
