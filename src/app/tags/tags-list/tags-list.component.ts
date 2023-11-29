import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../../shared/models/tag";

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  @Input('displayedTags') tags: Tag[] = [];
  ngOnInit(): void {

  }



}
