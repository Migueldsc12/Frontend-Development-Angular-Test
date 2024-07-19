import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authKey: string = '';
  form!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Init Login Form
    this.form = this.fb.group({
      authKey: [''],
    });
  }

  /**
   * Values
   *
   * Return values from login form
   */
  get values() {
    return this.form.value;
  }

  /**
   * onSubmit
   *
   * Submit form values to the API
   */
  onSubmit() {
    if (this.values.authKey) {
      localStorage.setItem('authKey', this.values.authKey);
      this.router.navigate(['/products']);
    }
  }
}
