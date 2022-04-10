import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'alr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contactusForm: FormGroup;
  submittedOnce: boolean = false;
  navigationSubscription: SubscriptionLike;

  constructor(private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.contactusForm.reset();
        this.submittedOnce = false;
      }
    });
  }

  get name(): AbstractControl | null { return this.contactusForm.get('name'); }
  get message(): AbstractControl | null { return this.contactusForm.get('message'); }

  ngOnInit(): void {
    this.contactusForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(40)
      ]),
      message: new FormControl("", [
        Validators.required,
        Validators.maxLength(120)
      ])
    })
  }

  public sendMessage(){
    this.submittedOnce = true;

    if(this.contactusForm.valid){
      alert('Obrigado pela mensagem. Em breve retornaremos seu contato =]');
      this.contactusForm.reset();
      this.submittedOnce = false;
    } 
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
