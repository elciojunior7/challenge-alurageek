import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './views/detail/detail.component';
import { LoginComponent } from './views/login/login.component';
import { StoreComponent } from './views/store/store.component';
import { AdmProductComponent } from './views/admin/adm-product/adm-product.component';
import { AdmProductsComponent } from './views/admin/adm-products/adm-products.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductsCategoryComponent } from './views/products-category/products-category.component';

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'products/:category', component: ProductsCategoryComponent },
  { path: 'products/query/:queryTerm', component: ProductsCategoryComponent },
  { path: 'adm-product/:id', component: AdmProductComponent, canActivate: [AuthGuard] },
  { path: 'adm-product', component: AdmProductComponent, canActivate: [AuthGuard] },
  { path: 'adm-products', component: AdmProductsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
