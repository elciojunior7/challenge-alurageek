import { Component } from '@angular/core';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'alr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alura-store';
  faArrowRight = faArrowRight;
}
