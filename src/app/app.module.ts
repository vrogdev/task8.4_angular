import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeCatalogComponent} from './pages/home-catalog/home-catalog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryBarComponent} from './pages/home-catalog/category-bar/category-bar.component';
import {TagsListComponent} from './tags/tags-list/tags-list.component';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {SharedModule} from "./shared/shared.module";
import {CartModule} from "./cart/cart.module";
import {CertificatesModule} from "./certificates/certificates.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeCatalogComponent,
    CategoryBarComponent,
    TagsListComponent,
    LoginPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CartModule,
    CertificatesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
