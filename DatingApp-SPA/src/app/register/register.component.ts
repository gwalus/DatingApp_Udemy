import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();  // komunikacja z komponentami "rodzicami"
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }
  // wstrzyknięcie serwisów

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful'); // zastąpienie konsoli
    }, error => {
      this.alertify.error(error); // zastąpienie konsoli
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning('Cancelled'); // zastąpienie konsoli
  }
}
