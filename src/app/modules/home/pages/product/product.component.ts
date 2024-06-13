import {Component, Inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../../interfaces/product";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    EditProductComponent,
    NgOptimizedImage,
    RouterLink,
    TitleCasePipe,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  product?: Product ;
  productId: string | any = '' ;


  constructor(
    private _home: HomeService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productId = data;
  }

  ngOnInit() {
    this.getProductById(this.productId);
  };

  closeModal(){
    this._dialog.closeAll();
  }

  formatPrice(price: any): string {
    return `$ ${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  getProductById(id : any){
    this._home.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
      }
    })
  }

}
