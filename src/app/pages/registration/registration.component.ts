import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { UserDTO } from "../../shared/models/UserDTO";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required)
  });
  loading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.error = 'Please fill out all required fields.';
      return;
    }

    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('passwordAgain')?.value) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.authService.signUp(
      this.registrationForm.get('email')?.value as string,
      this.registrationForm.get('password')?.value as string
    ).then(cred => {
      this.loading = false;
      const user: UserDTO = {
        id: cred.user?.uid as string,
        email: this.registrationForm.get('email')?.value as string,
        name: this.registrationForm.get('name')?.value as string
      };
      this.userService.addUser(user).then(_ => {
        console.log('successful');
        this.router.navigate(['/main']);
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
      this.loading = false;
      this.error = error.message;
    });
  }
}
