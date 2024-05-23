import {Component, OnInit, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../../interfaces/product";
import {AlertService} from "../../../../core/services/alert.service";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ProductComponent} from "../product/product.component";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EditProductComponent,
    NgOptimizedImage,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  handlerMenu: WritableSignal<boolean> = this._home.cardSignal;
  products: Product[] = [];
  searchTerm: string = "";

  constructor(
    private _home: HomeService,
    private _alert: AlertService,
    private _dialog: MatDialog,
    private _loader: LoadingService,
    private _route: Router,
  ) {
  }

  ngOnInit() {
    // this._loader.show();
    this.getProduct();
  }

  formatPrice(price: number): string {
    return `$ ${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  searchProducts(): void {
    const text = this.searchTerm.toLowerCase();
    if (text === "") {
      this.getProduct();
    } else {
      this.products = this.products.filter(product =>
        product.title.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text)
      );
    }
  }

  getProduct() {
    this._home.getProduct().subscribe({
      next: (data) => {
        // this._loader.hide();

        this.products = data;
        data.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )
      }
    })
  }

  productDetail(id: number) {
    this._dialog.open(ProductComponent, {
      width: '1000px',
      height: '440px',
      data: id
    })
  }

  addedProduct(add: boolean) {
    if (add) {
      this.getProduct();
    }
  }

  logOut() {
    localStorage.clear();
    this._route.navigateByUrl('/login')
  }

}
