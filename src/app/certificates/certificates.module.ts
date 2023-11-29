import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {CertificateComponent} from "./certificate/certificate.component";
import {CertificateDetailsComponent} from "./certificate-details/certificate-details.component";
import {CertificateNewComponent} from "./certificate-new/certificate-new.component";
import {CertificatesListComponent} from "./certificates-list/certificates-list.component";
import {SearchBoxComponent} from "./search-box/search-box.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    CertificateComponent,
    CertificateDetailsComponent,
    CertificateNewComponent,
    CertificatesListComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    CertificateNewComponent,
    CertificatesListComponent,
    CertificateDetailsComponent,
    SearchBoxComponent
  ]
})
export class CertificatesModule { }
