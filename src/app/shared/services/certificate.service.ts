import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {map, throwIfEmpty} from 'rxjs/operators';

import {Certificate} from "../models/certificate";
import {CertificatesData} from "../models/types";
import {optionBox} from "../utils/optionBox";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/api/certificates';
  }

  getCertificates(page: number, size: number = 10): Observable<Certificate[]> {
    return this.getCertificatesByUrl(this.apiUrl, page, size)
  }


  private getCertificatesByUrl(url: string, page: number, size: number = 10): Observable<Certificate[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'createDate,asc');
    return this.http.get<CertificatesData>(url, {params}).pipe(
      map(data => {
        return data._embedded.giftCertificateDtoList
      })/*, catchError((err) => {
        console.log(err['error']);
        return of(null)
        // console.log(caught);
        // throw new Error('error on certificates fetch');
      })*/
    );
  }

  searchCertificates(data, page: number, size: number = 10): Observable<Certificate[]> {
    let certificates;
    console.log(data)
    switch (data.optionsBox) {
      case optionBox.all: {
        console.log('all: ' + this.apiUrl + `/search/${data.searchValue}`)
        certificates = this.getCertificatesByUrl(this.apiUrl + `/search/${data.searchValue}`, page, size)
        break;
      }
      case optionBox.certificates: {
        console.log('certificates: ' + this.apiUrl + `/search/${data.searchValue}`)
        certificates = this.getCertificatesByUrl(this.apiUrl + `/search/${data.searchValue}`, page, size)
        break;
      }
      case optionBox.tags: {
        console.log('tags: ' + this.apiUrl + `/search/${data.searchValue}`)
        certificates = this.getCertificatesByUrl(this.apiUrl + `tagname/${data.searchValue}`, page, size)
        break;
      }
    }

    return certificates;
  }

  getCertificate(id: number): Observable<Certificate> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Certificate>(url).pipe(
      throwIfEmpty(() => new Error(`Certificate with id=${id} not found`)));
  }

  addCertificate(certificate: Certificate){
    return this.http.post(this.apiUrl, certificate, {responseType: 'text', observe:"response"});
  }
}
