import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { StoreComponent } from './store/store.component';
import { AdmProductComponent } from './adm-product/adm-product.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { AdmProductsComponent } from './adm-products/adm-products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    FooterComponent,
    StoreComponent,
    AdmProductComponent,
    LoginComponent,
    DetailComponent,
    AdmProductsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(255,255,255,.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#2A7AE4'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
