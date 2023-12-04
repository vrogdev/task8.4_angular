import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../../../shared/services/certificate.service";
import {Certificate} from "../../../shared/models/certificate";
import {Location} from '@angular/common';
import {OrderService} from "../../../shared/services/order.service";
import {UserService} from "../../../shared/services/user.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  certificates: Certificate[] = [];
  totalPrice: number = 0;

  constructor(
    private certificateService: CertificateService,
    private orderService: OrderService,
    private userService: UserService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    let cart = localStorage.getItem("cart");
    let cartIds: string[] = JSON.parse(cart);

    if (cartIds != null) {
      for (const id of cartIds) {
        this.certificateService.getCertificate(Number(id))
          .subscribe(certificate => {
            this.certificates.push(certificate)
            this.totalPrice += certificate.price
          })
      }
    }

  }

  goBack() {
    this.location.back();
  }

  clearOrder(): void {
    this.orderService.clearCart()
    this.certificates = []
    this.totalPrice = 0;
  }

  submitOrder() {
    this.orderService.createOrder(this.certificates)
    this.clearOrder()
  }

  checkIfCartDisabled(): boolean {
    return this.certificates.length == 0 && this.userService.isAuthorized()
  }
}
