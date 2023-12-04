import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Certificate} from "../models/certificate";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl: string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.apiUrl = 'http://localhost:8080/api/orders/';
  }

  clearCart() {
    localStorage.removeItem("cart")
  }

  addToCart(certificate: Certificate): void {
    let id = certificate.id
    let cart = []

    if (localStorage.getItem("cart") != null) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }

    let find = cart.find(value => {
      return value === id
    });

    if (find == null)
      cart.push(id)

    localStorage.setItem("cart", JSON.stringify(cart))
  }


  createOrder(certificates: Certificate[]): void {
    for (const certificate of certificates) {
      let userId = this.userService.getAuthorizedUserId()
      const url = `${this.apiUrl}create?userId=${userId}&giftCertificateId=${certificate.id}`;
      this.http.post<any>(url, certificate, {observe: "response"})
        .subscribe({
          next: response => {
            if (response.status != 200) {
              throw new Error(`can't add order with user id: ${userId} and certificate id ${certificate.id}`)
            }
          }
        });
    }
  }

}
