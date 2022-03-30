import { Component, Input, OnInit } from '@angular/core';
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'alr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPencil = faPencil;
  @Input() image: string;
  @Input() name: string;
  @Input() cost: string;
  @Input() goLink: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}