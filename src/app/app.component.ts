import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingService} from "./core/services/loading.service";
import {LoadingComponent} from "./shared/loading/loading.component";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loading = this._loader.loading$;

  constructor(
    private _loader: LoadingService
  ) {
  }
}
