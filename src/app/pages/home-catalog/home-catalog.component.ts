import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Certificate} from "../../shared/models/certificate";
import {Observable} from "rxjs";
import {CertificateService} from "../../shared/services/certificate.service";
import {Tag} from "../../shared/models/tag";
import {TagService} from "../../shared/services/tag.service";

@Component({
  selector: 'app-home-catalog',
  templateUrl: './home-catalog.component.html',
  styleUrls: ['./home-catalog.component.scss']
})
export class HomeCatalogComponent implements OnInit {
  certificates: Certificate[] = [];
  showTags: boolean = false;
  showSearch: boolean = false;
  lastPage: boolean = false;
  tags: Tag[];
  PAGE_SIZE = 10;
  private _currentPage = 0;
  private searchData;

  constructor(
    private certificateService: CertificateService,
    private tagService: TagService,
  ) {
  }

  ngOnInit(): void {
    this.initCertificates()
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event: Event): void {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && this.checkMoreContent()) {
      this.loadMore()
    }
  }

  checkMoreContent() {
    return !this.lastPage;
  }

  private loadMore() {
    if (this.showTags) {
      this.tagService.getTags(this._currentPage++, this.PAGE_SIZE)
        .subscribe({
          next: data => this.tags = this.tags.concat(data),
          error: error => this.stopDataRequest()
        });
      return;
    }

    this.getCertificates().subscribe({
      next: data => this.certificates = this.certificates.concat(data),
      error: error => this.stopDataRequest()
    })
  }


  private stopDataRequest() {
    this.lastPage = true;
    console.log('Received last page of data')
  }

  doSearch(data) {
    this.searchData = data;

    this.showSearch = this.searchData.searchValue.length > 0;
    console.log(this.searchData.searchValue.length)

    this.lastPage = false;
    this.showTags = false;
    this._currentPage = 0
    this.initCertificates();
  }

  private initCertificates() {
    this.getCertificates().subscribe({
      next: data => this.certificates = data
      ,
      error: error => this.stopDataRequest()
    })
  }

  private getCertificates(): Observable<Certificate[]> {
    if (this.showSearch) {
      return this.certificateService.searchCertificates(this.searchData, this._currentPage++, this.PAGE_SIZE)
    } else {
      return this.certificateService.getCertificates(this._currentPage++, this.PAGE_SIZE)
    }
  }

  doTags(showTags: boolean) {
    this._currentPage = 0
    this.showTags = showTags
    this.tags = null;
    this.lastPage = false;
    if (showTags) {
      this.initTags();
    } else {
      this.initCertificates()
    }
  }

  private initTags() {
    this.tagService.getTags(this._currentPage++, this.PAGE_SIZE)
      .subscribe({
        next: data => this.tags = data,
        error: error => this.stopDataRequest()
      })
  }
}
