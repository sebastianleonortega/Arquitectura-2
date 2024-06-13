import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {AlertService} from "../../../core/services/alert.service";
import {LoadingService} from "../../../core/services/loading.service";
import {MessageErrorsDirective} from "../../../shared/directives/field-errors/directive/message-errors.directive";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MessageErrorsDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({})

  constructor(
    private _route: Router,
    private _auth: AuthService,
    private _alert: AlertService,
    private _loader: LoadingService
  ) {
  }

  ngOnInit() {
    this.initFormRegister();
  }

  login() {
    this._route.navigateByUrl('/login').then();
  }

  initFormRegister(): void {
    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.min(4)]),
      password: new FormControl('', [Validators.required, Validators.min(4)]),
    })
  }


  sendFormRegister() {
    this._loader.show();
    const data = {
      username: this.formRegister.get('username')?.value,
      password: this.formRegister.get('password')?.value,
    }
    this._auth.register(data).subscribe({
      next: (r) => {
        this._route.navigateByUrl('/login').then();
        this._loader.hide();
        this._alert.success('Usuario registrado con exito');
      }, error: (err)  => {
        this._loader.hide();
        this._alert.warning(err.error);
      }
    })
  }


  goBack() {
    this._route.navigateByUrl('').then();
  }

}
