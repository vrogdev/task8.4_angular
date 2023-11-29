import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Certificate} from "../../shared/models/certificate";

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss']
})
export class CertificatesListComponent {
  @Input('displayedItems') certificates: Certificate[] = [];
}
