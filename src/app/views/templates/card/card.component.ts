import { Component, Input, OnInit } from '@angular/core';
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import { environment } from 'src/environments/environment';
import { Product } from '../../../models/product';
import { DataResponse, GeneralService } from '../../../services/general.service';

@Component({
  selector: 'alr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPencil = faPencil;
  @Input() product: Product;
  @Input() goLink: boolean;

  imageBasePath = environment.supabaseImagesUrl;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  public async deleteProduct(idProduct: number, pathImage: string){

    const arrFilename = pathImage.split('images/products/');

    if(confirm("Deseja realmente apagar o produto = " + idProduct)){
      const response: DataResponse = await this.generalService.deleteProduct(
        idProduct, arrFilename.length === 2 ? arrFilename[1] : null
      );
      alert(response.msg);
      location.reload();
    }
  } 
}