import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService ) {
  }

  async login() {
    this.loading = true;
    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      this.loading = false;
      this.router.navigateByUrl('/main');
    }).catch(error => {
      this.loading = false;
      console.error(error);
    });
  }

}
