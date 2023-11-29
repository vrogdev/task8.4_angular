import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Certificate} from "../../shared/models/certificate";
import {CertificateService} from "../../shared/services/certificate.service";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {

  certificate: Certificate = new Certificate();
  tags = '';

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    public orderService: OrderService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.certificateService.getCertificate(id).subscribe(data => {
      this.certificate = data;
    });
  }

  addToOrder(): void {
    this.orderService.addToCart(this.certificate);
  }
}
