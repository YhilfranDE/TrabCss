import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ClientsService } from '../../services/clients/clients.service';
import * as $AB from 'jquery';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  // Objeto con atributos de formulario
  data = {
    passwordNew: null,
    passwordConfir: null
  };
  msg: string;
  loading: boolean = false;
  isLoginError: boolean = false;
  errorMessage: string;

  constructor(private clientsService: ClientsService, private router: Router) {
    this.data = {
      passwordNew: '',
      passwordConfir: ''
    };
  }

  ngOnInit() {}

  cambiarPassword(form: NgForm) {
    console.log(form);
    this.loading = true;
    var userId = localStorage.getItem('userId');
    if (form.value.passwordNew === form.value.passwordConfir) {
      this.clientsService
        .cambiarContrasenia(
          userId,
          form.value.passwordNew,
          form.value.passwordConfir
        )
        .subscribe(
          result => {
            console.log(result);
            this.data = { passwordNew: null, passwordConfir: null };
            this.loading = false;
            (<any>$('#mostrarmodal')).modal({
              backdrop: 'static',
              keyboard: false
            });
          },
          err => {
            this.loading = false;
            this.isLoginError = true;
            var error = <any>err;
            var jsonObject = JSON.parse(error.text());
            this.errorMessage = jsonObject.message;
            this.msg = this.errorMessage;
          }
        );
    } else {
      this.loading = false;
      this.msg = 'Las contraseñas no coinciden';
    }
  }
  onClickMe() {
    this.router.navigate(["/Principal/EvolucionFacturacion"]);
  }

  changePassword(password, confPassword) {
    this.loading = true;
    const userId = localStorage.getItem('userId');
    if (password === confPassword) {
      this.clientsService
        .cambiarContrasenia(userId, password, confPassword)
        .subscribe(
          result => {
            console.log(result);            
            this.loading = false;
            (<any>$('#mostrarmodal')).modal({
              backdrop: "static",
              keyboard: false
            });
          },
          err => {
            this.loading = false;
            this.isLoginError = true;
            const error = <any>err;
            const jsonObject = JSON.parse(error.text());
            this.errorMessage = jsonObject.message;
            this.msg = this.errorMessage;
          }
        );
    } else {
      this.loading = false;
      this.msg = 'Las contraseñas no coinciden';
    }
  }

  onClick() {
    this.data = { passwordNew: null, passwordConfir: null };
    this.router.navigate(["/Principal/CambioContaseña"]);
  }
}
