import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;
  @Input() cost: string;
  @Input() goLink: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
