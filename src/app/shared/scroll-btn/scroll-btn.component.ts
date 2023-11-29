import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-scroll-btn',
  templateUrl: './scroll-btn.component.html',
  styleUrls: ['./scroll-btn.component.scss']
})
export class ScrollBtnComponent implements AfterViewInit{
  @ViewChild('scrollBtn') scrollBtnRef: ElementRef;

  ngAfterViewInit(): void {
    let scrollBtn = this.scrollBtnRef.nativeElement;

    window.addEventListener('scroll',() =>{
      if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo(0,0)
    })
  }

}
