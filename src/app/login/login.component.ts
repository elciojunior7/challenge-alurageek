import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'alr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submittedOnce: boolean = false;
  loginError: boolean = false;

  constructor(private router: Router) { }

  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required, 
        Validators.email //regular expression here: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    })
  }

  public login(){
    this.submittedOnce = true;
    this.loginError = false;

    if(this.loginForm.valid){
      if(this.loginForm.get('email').value === "bob@bob.com" && this.loginForm.get('password').value === "bob")
        this.router.navigate(['/adm-products']);
      else
        this.loginError = true;
    } 
  }

}
