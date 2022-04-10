import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { AdmProductsComponent } from './adm-products/adm-products.component';
import { StoreComponent } from './store/store.component';
import { AdmProductComponent } from './adm-product/adm-product.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'adm-product/:id', component: AdmProductComponent, canActivate: [AuthGuard] },
  { path: 'adm-product', component: AdmProductComponent, canActivate: [AuthGuard] },
  { path: 'adm-products', component: AdmProductsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
