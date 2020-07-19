import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();  // komunikacja z komponentami "rodzicami"
  // model: any = {};
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>; // poprzez Partial możemy ustawić je całkowicie opcjonalne

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }
  // wstrzyknięcie serwisów

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

  this.bsConfig = {
    containerClass: 'theme-red'
  };
  this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }
  // prostszy sposób z użyciem wbudowanego FormBuildera

  passwordMatchValidator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // metoda ta automatycznie pobiera dane z formularza do pustego pierwszego parametru i przypisuje zmiennej
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('registration successful'); // zastąpienie konsoli
    // }, error => {
    //   this.alertify.error(error); // zastąpienie konsoli
    // });
    // moduł 12, zastąpienie przez formy reaktywne    
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning('Cancelled'); // zastąpienie konsoli
  }
}
