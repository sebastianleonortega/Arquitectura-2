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
  parsedImages: string[] = [];
  carouselData: any = [];

  currentIndex: number = 0;

  constructor(
    private _home: HomeService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productId = data;
  }

  ngOnInit() {
    this.startAutoPlay();
    this.getProductById(this.productId);
  };

  closeModal(){
    this._dialog.closeAll();
  }

  getProductById(id : any){
    this._home.getProductById(id).subscribe({
      next: (data) => {
        this.parsedImages =  data.images;

        if (data.images[0].startsWith('["')) {
         this.parsedImages = JSON.parse(data.images);
        }
        this.product = data;
        this.parsedImages =  JSON.parse(data.images);

        this.carouselData  = this.parsedImages.map((url, index) => ({
          id: index + 1,
          image: url
        }));

      }
    })
  }

  prevItem(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.carouselData.length - 1 : this.currentIndex - 1;
  }
  nextItem(): void {
    console.log(this.currentIndex)
    this.currentIndex = (this.currentIndex === this.carouselData.length - 1) ? 0 : this.currentIndex + 1;
  }
  startAutoPlay(): void{
    setInterval(() => {
      this.nextItem();
    }, 8000); // 8000 milisegundos = 8 segundos
  }

}
