import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  form: FormGroup
  private timer: number;

  @ViewChild('clearBtn') clearBtn: ElementRef
  @Output() onSearch = new EventEmitter()


  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchValue: new FormControl(''),
      optionsBox: new FormControl('all')
    })
  }

  doSearch() {

    if (this.form.controls['searchValue'].value === '') {
      this.clearBtn.nativeElement.visibility = 'hidden'
    } else {
      console.log(this.clearBtn)
      this.clearBtn.nativeElement.visibility = 'visible'
    }

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.onSearch.emit(this.form.value)
      console.log(this.form.value)
    }, 500)
  }

  clearForm() {
    this.form.patchValue({searchValue: ''})
    this.doSearch()
  }
}
