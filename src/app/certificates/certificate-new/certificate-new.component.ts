import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Certificate} from "../../shared/models/certificate";
import {Tag} from "../../shared/models/tag";
import {CertificateService} from "../../shared/services/certificate.service";
import {TagService} from "../../shared/services/tag.service";


@Component({
  selector: 'app-certificate-new',
  templateUrl: './certificate-new.component.html',
  styleUrls: ['./certificate-new.component.scss']
})
export class CertificateNewComponent {
  @ViewChild('optional') optional: ElementRef

  constructor(
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private tagService: TagService
  ) {
  }

  certificateForm = this.fb.group({
    category: [''],
    itemName: ['', Validators.required],
    description: [''],
    duration: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern("^[0-9.]*$")]]
  })

  controls = {
    description: new FormControl(''),
    duration: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  }

  submitForm() {
    if (this.certificateForm.value.category == 'certificates') {
      let certificate = this.parseCertificateValues();
      this.certificateService.addCertificate(certificate).subscribe(response => {
        console.log(response)
      })

    } else if(this.certificateForm.value.category == 'tags') {
      let tag = this.parseTagValues();
      this.tagService.addTag(tag).subscribe(response => {
        console.log(response)
      })
    }
  }

  parseCertificateValues(): Certificate {

    let certificate = new Certificate();
    certificate.name = this.certificateForm.value.itemName;
    certificate.description = this.certificateForm.value.description;
    certificate.duration = this.daysBetween(this.certificateForm.value.duration);
    certificate.price = Number(this.certificateForm.value.price);

    return certificate;
  }

  parseTagValues() {
    return new Tag(this.certificateForm.value.itemName);
  }

  modifyForm($event: Event) {
    let optionalFields = this.optional.nativeElement.getElementsByClassName('optional');

    if ($event.target['value'] == 'certificates') {
      for (const optional of optionalFields) {
        optional.style.display = 'block'
      }

      this.certificateForm.addControl("description", this.controls.duration)
      this.certificateForm.addControl("duration", this.controls.duration)
      this.certificateForm.addControl("price", this.controls.duration)
    } else if ($event.target['value'] == 'tags') {
      for (const optional of optionalFields) {
        optional.style.display = 'none'
      }

      this.certificateForm.removeControl('description')
      this.certificateForm.removeControl('duration')
      this.certificateForm.removeControl('price')
    }
  }

  private daysBetween(dateValue) {
    let dateNow = Date.now();
    let dateValidTo = new Date(dateValue);


    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(dateValidTo.getMilliseconds() - Date.now());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }
}


