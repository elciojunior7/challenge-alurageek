import { Component, OnInit } from '@angular/core';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'alr-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
