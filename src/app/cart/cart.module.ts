import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from "./checkout/checkout/checkout.component";
import {CartItemComponent} from "./checkout/cart-item/cart-item.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    CheckoutComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'cart', component: CheckoutComponent}
    ])
  ],
  exports: [
    // CheckoutComponent
    RouterModule
  ]
})
export class CartModule {
}
