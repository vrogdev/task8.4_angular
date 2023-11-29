import { Component, Input } from '@angular/core';
import {Certificate} from "../../shared/models/certificate";
import {OrderService} from "../../shared/services/order.service";


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  @Input('certificate-card') certificate: Certificate;

  constructor(
    private orderService: OrderService,
    ) {
  }

  addToOrder(): void {
    this.orderService.addToCart(this.certificate);
  }
}
