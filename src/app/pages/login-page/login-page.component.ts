import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Credentials} from "../../shared/models/credentials";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('errorLabel') errorLabel: ElementRef

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(): void {
    let credentials = this.loginForm.value as Credentials;
    this.userService.login(credentials).subscribe(resp => {
      console.log(resp.status);
      if (resp.status === 200) {
        this.userService.authorizeUser(resp.body.user)
        localStorage.setItem("role", resp.body.role)

        this.router.navigate(["/home"])
      }
    }, error => {
      console.log(error);
      this.errorLabel.nativeElement.hidden = false;
    });
  }

}
