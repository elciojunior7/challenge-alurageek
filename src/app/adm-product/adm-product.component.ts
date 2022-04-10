import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../models/product';
import { DataResponse, GeneralService } from '../services/general.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
  submittedOnce: boolean = false;

  productForm: FormGroup;

  constructor(private route:ActivatedRoute, 
    private generalService: GeneralService, 
    private router: Router) { }

  // gets to use in tag p to print (or dont) error message according to validations
  get title(): AbstractControl | null { return this.productForm.get('title'); }
  get cost(): AbstractControl | null { return this.productForm.get('cost'); }
  get description(): AbstractControl | null { return this.productForm.get('description'); }
  get category(): AbstractControl | null { return this.productForm.get('category'); }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id');
    if(this.idProduct)
      this.getProduct(parseInt(this.idProduct));
    else
      this.createProduct(new Product());
    this.listCategories();
  }

  // Fields and their validations (take a look at html)
  createProduct = (prod: Product) => {
    this.product = prod;
    console.log(this.product)
    this.productForm = new FormGroup({
      title: new FormControl(this.product.title, [
        Validators.required, Validators.minLength(3), Validators.maxLength(20)
      ]),
      cost: new FormControl(prod.cost, [
        Validators.required
      ]),
      description: new FormControl(prod.description, [
        Validators.maxLength(150)
      ]),
      category: new FormControl(prod.category, [
        Validators.required
      ]),
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
      imagePreview.alt = this.selectedFile.name;
    }, .8);
  }

  private listCategories(){
    this.categories = Object.entries(Category)
      .map(([key, value]) => (value));
  }

  public async saveProduct(){
    this.loading = true;
    this.submittedOnce = true;

    // 'de-para' de: Form control object, which has every value fields of form Product
    // 'de-para' para: object type Product 
    this.product = Object.assign(this.product, this.productForm.value);

    await this.validateForm();  
  }

  private async validateForm() {
    if ((this.selectedFile || this.product.imagePath) && this.productForm.valid) {
      let resp: DataResponse;
      if (this.product.id) {
        const file = this.buildFileImage();
        resp = await this.generalService.updateImageAndProduct(file, this.product);
      }
      else
        resp = await this.generalService.addImageAndProduct(this.selectedFile, this.product);

      this.loading = false;

      alert(resp.msg);
      if (resp.status !== 500)
        this.router.navigate(['/adm-products']);
    }
    else
      this.loading = false;
  }

  private buildFileImage() {
    const arrFilename = this.product.imagePath.split('images/products/');
    const filename = arrFilename.length === 2 ? arrFilename[1] : null;
    const file = this.selectedFile?.name.includes(filename) ? null : this.selectedFile;
    return file;
  }
}
