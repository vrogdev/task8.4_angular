import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss']
})
export class CategoryBarComponent {
  @Output() onCategoryChange = new EventEmitter<boolean>()

  showTags(showTags: boolean) {
    this.onCategoryChange.emit(showTags)
  }
}
