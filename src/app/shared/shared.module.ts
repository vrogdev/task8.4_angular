import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {CustomCurrencyPipe} from "./pipes/custom-currency.pipe";
import {ScrollBtnComponent} from "./scroll-btn/scroll-btn.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent,
    ScrollBtnComponent,
    CustomCurrencyPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink
  ],
  exports: [
    NavbarComponent,
    ScrollBtnComponent,
    CustomCurrencyPipe
  ]
})
export class SharedModule { }
