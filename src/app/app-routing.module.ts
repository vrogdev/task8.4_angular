import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeCatalogComponent} from "./pages/home-catalog/home-catalog.component";
import {CertificateDetailsComponent} from "./certificates/certificate-details/certificate-details.component";
import {CertificateNewComponent} from "./certificates/certificate-new/certificate-new.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeCatalogComponent},
  {path: 'new', component: CertificateNewComponent, canActivate: [AuthGuard]},
  {path: 'certificate/:id', component: CertificateDetailsComponent, pathMatch: 'full'},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'login', component: LoginPageComponent},
  {path: '**', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
