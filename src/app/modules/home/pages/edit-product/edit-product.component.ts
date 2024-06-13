import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {InputMaskDirective} from "../../../../core/directives/input-mask.directive";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {AlertService} from "../../../../core/services/alert.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MessageErrorsDirective} from "../../../../shared/directives/field-errors/directive/message-errors.directive";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgSelectModule,
    InputMaskDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    NgIf,
    MessageErrorsDirective,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {


  showTitle: boolean = false;

  formProduct: FormGroup = new FormGroup({});
  productId: string | any = '';

  images: string[] = []

  @Output() addedProduct: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editProduct: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _home: HomeService,
    private _alert: AlertService,
    private _dialog: MatDialog,
    private _loader: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productId = data;
  }


  ngOnInit() {
    this.initFormProduct();

    if (this.productId){
      this.getProductById(this.productId);
    }
  }

  getProductById(id: any) {
    this._loader.show();
    this._home.getProductById(id).subscribe({
      next: (data) => {
        console.log(data)
        this.setDataProduct(data);
        this._loader.hide();
        this.showTitle = true;
      }, error: () => {
        this._alert.error("error al obtener producto")
      this._loader.hide();

    }
    })
  }

  setDataProduct(data: any) {
    this.formProduct.get('title')?.setValue(data['nombre']);
    this.formProduct.get('price')?.setValue(data['valor']);
    this.formProduct.get('description')?.setValue(data['detalle']);
    this.formProduct.get('images')?.setValue(data['img']);
  }

  initFormProduct() {
    this.formProduct = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      images: new FormControl('',[Validators.required] ),
    })
  }

  imageURLValidator(control: FormControl): { [key: string]: boolean } | null {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?.(jpg|jpeg|png|gif|bmp)$/i;
    if (!control.value || !urlPattern.test(control.value)) {
      return { 'invalidImageUrl': true };
    }
    return null;
  }

  sendFormProduct() {
    if (this.formProduct.valid) {
      this._loader.show();
      const data = {
        nombre: this.formProduct.get("title")?.value,
        valor: this.formProduct.get("price")?.value,
        detalle: this.formProduct.get("description")?.value,
        img: this.formProduct.get("images")?.value,
      }
      if (this.productId != null) {
        this._home.updateProduct(this.productId, data).subscribe({
          next: (r) => {
            this.editProduct.emit(true)
            this._alert.success("producto editado")
            this.closeModal();
            this._loader.hide()
          }, error: () => {
            this._alert.error("error al actualizar el producto");
            this._loader.hide();
          }
        })
      } else {
        this._home.saveProduct(data).subscribe({
          next: (r) => {
            this.addedProduct.emit(true)
            this._alert.success("producto agregado")
            this._loader.hide();
            this.closeModal();
          }, error: () => {
            this._alert.error("error al guardar el producto");
            this._loader.hide();
          }
        })
      }
    }else {
      this._alert.warning("Faltan datos en el formulario")
    }
  }


  closeModal(){
    this._dialog.closeAll();
  }

}

