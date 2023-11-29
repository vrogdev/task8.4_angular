import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Tag} from "../models/tag";
import {TagsData} from "../models/types";


@Injectable({
  providedIn: 'root'
})
export class TagService {
  readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/api/tags'
   }

  getTags(page: number, size: number): Observable<Tag[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<TagsData>(this.apiUrl, { params }).pipe(
      map(data => data._embedded.tagDtoList));
  }

  addTag(tag: Tag) {
    return this.http.post(this.apiUrl, tag, {responseType: 'text', observe: 'response'});
  }
}
