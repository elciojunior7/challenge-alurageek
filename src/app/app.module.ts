import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './views/templates/card/card.component';
import { FooterComponent } from './views/templates/footer/footer.component';
import { StoreComponent } from './views/store/store.component';
import { AdmProductComponent } from './views/admin/adm-product/adm-product.component';
import { LoginComponent } from './views/login/login.component';
import { DetailComponent } from './views/detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxMaskModule, IConfig } from 'ngx-mask';
// **************************************************
// Enable comma as default currency separator of cents
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './views/templates/header/header.component';
import { AdmProductsComponent } from './views/admin/adm-products/adm-products.component';
import { ProductsCategoryComponent } from './views/products-category/products-category.component';
registerLocaleData(ptBr);
// **************************************************

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

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
    AdmProductsComponent,
    ProductsCategoryComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(255,255,255,.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#2A7AE4'
    }),
  ],
  // in order to use comma as separator of the currency, this guy provides the resource to do that to be used in app at all
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
