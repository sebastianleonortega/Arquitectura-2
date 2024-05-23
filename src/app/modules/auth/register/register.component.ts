import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({})

  constructor(
    private _route: Router,
    private _auth: AuthService,
    private _alert: AlertService
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
      name: new FormControl('', [Validators.required, Validators.min(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(4)]),
      avatar: new FormControl('')
    })
  }


  sendFormRegister() {
    const data = {
      name: this.formRegister.get('name')?.value,
      email: this.formRegister.get('email')?.value,
      password: this.formRegister.get('password')?.value,
      avatar: 'https://picsum.photos/800'
    }
    this._auth.register(data).subscribe({
      next: (r) => {
        this._route.navigateByUrl('/login').then();
        this._alert.success('Usuario registrado con exito');
      }, error: err => {
        console.log(err);
        this._route.navigateByUrl('/login').then();
        this._alert.warning('Ocurrio un error al registrar el usuario');
      }
    })
  }


  goBack() {
    this._route.navigateByUrl('').then();
  }

}
