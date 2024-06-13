import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {InputMaskDirective} from "../../../core/directives/input-mask.directive";
import {MessageErrorsDirective} from "../../../shared/directives/field-errors/directive/message-errors.directive";
import {LoadingService} from "../../../core/services/loading.service";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputMaskDirective,
    MessageErrorsDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(
    private _auth: AuthService,
    private _route: Router,
    private _loader: LoadingService,
    private _alert: AlertService
  ) {
  }

  ngOnInit() {
    this.initFormLogin();
  }

  initFormLogin() {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.min(4)]),
      password: new FormControl('', [Validators.required, Validators.min(4)])
    })
  }

  sendFormLogin() {
    if (this.formLogin.valid) {
      this._loader.show();
      const data = {
        username: this.formLogin.get("username")?.value,
        password: this.formLogin.get("password")?.value,
      }
      this._auth.login(data).subscribe({
        next: (r) => {
          this._route.navigateByUrl('home').then();
          this._alert.success(r.msg)
          localStorage.setItem("access_token", r.token)
          this._loader.hide();

        }, error: () => {
          this._loader.hide();
          this._alert.error("credenciales icorrectas")

        }
      })
    } else {
      this._alert.warning("formulario no valido")
    }
  }

  register() {
    this._route.navigateByUrl('/register').then();
  }

}
