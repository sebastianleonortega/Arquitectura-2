import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [],
  templateUrl: './page-404.component.html',
  styleUrl: './page-404.component.scss'
})
export class Page404Component implements OnInit {

  constructor(
    private _route: Router,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.localStorage && localStorage.getItem("access_token")) {
        if (!localStorage.getItem('access_token')) {
          this._route.navigateByUrl('login').then();
        } else {
          this._route.navigateByUrl('home').then();
        }
      }
    }, 1500)
  }

}
