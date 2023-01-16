import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { delay } from 'rxjs';
import { Producto } from '../model/producto.model';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  constructor(private productoService: ProductoService, private fb: FormBuilder) {}
  
  productos: Producto[] = [];
  isCreating: boolean = false;

  productSelected: Producto = {} as Producto;

  form = this.fb.group({
    id: [0, [Validators.required]],
    descuento: ['', [Validators.required]],
    valor: [0, [Validators.required]]
 });

  selectProduct(product: Producto) {
    if(Object.keys(this.productSelected).length === 0) {
      this.productSelected = product;

      this.form.patchValue({
        id: product.proID,
        descuento: product.proDesc.toString(),
        valor: product.proValor
      })
    }
  }

  update() {
    this.productSelected.proDesc = (this.form.value.descuento?.toString())!;
    this.productSelected.proValor = this.form.value.valor!;
    if (this.isCreating) {
      this.productoService.create(this.productSelected).subscribe(
        response => {
          console.log('updated');
          alert("Producto creado correctamente.");
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.productoService.update(this.productSelected.proID, this.productSelected).subscribe(
        response => {
          console.log('updated');
          alert("Producto actualizado correctamente.");
          this.ngOnInit();
        },
        (error) => {
          var alerta;
          if (error.error.title)
            alerta = "Error: " + error.error.title;
          else if (error.error)
            alerta = "Error: " + error.error;

          alert(alerta);
          console.log(error);
        }
      )
    }
    
    console.log(this.productSelected);
  this.productSelected = {} as Producto;
  this.isCreating = false;
}

cancel() {
  this.productSelected = {} as Producto;
  this.form.reset();
}

deleteProduct(index: number) {
  if (confirm('¿Está seguro que desea eliminar el producto?')) {
    this.productoService.delete(index).subscribe(
      response => {
        console.log('updated');
        this.ngOnInit();
      },
      (error) => {
        console.log('error');
      }
      )
    this.ngOnInit();
  }
}

addProduct() {
  this.isCreating = true;
  this.productos.push({
    proID: this.productos.length + 1,
    proDesc: '',
    proValor: 0
  })
}  
  ngOnInit() {
    this.productoService.getAll().subscribe (
      response => {
        this.productos = response;
        console.log(response);
      }
    )
  }

}
