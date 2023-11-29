import {Component, Input} from '@angular/core';
import {Certificate} from "../../../shared/models/certificate";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() certificate: Certificate;

}
