import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pedido } from '../model/pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  constructor(private pedidoService: PedidoService, private fb: FormBuilder) {}
  
  Pedidos: Pedido[] = [];
  isCreating: boolean = false;

  pedidoSelected: Pedido = {} as Pedido;

  form = this.fb.group({
    id: [0, [Validators.required]],
    usu: [0, [Validators.required]],
    pro: [0, [Validators.required]],
    vrUnit: [0, [Validators.required]],
    cant: [0, [Validators.required]],
    subtot: [0, [Validators.required]],
    iva: [0, [Validators.required]],
    total: [0, [Validators.required]]
 });

  selectpedido(pedido: Pedido) {
    if(Object.keys(this.pedidoSelected).length === 0) {
      this.pedidoSelected = pedido;

      this.form.patchValue({
        id: pedido.pedID,
        usu: pedido.pedUsu,
        pro: pedido.pedPro,
        vrUnit: pedido.pedVrUnit,
        cant: pedido.pedCant,
        subtot: pedido.pedSubtot,
        iva: pedido.pedIVA,
        total: pedido.pedTotal
      })
    }
  }

  update() {
    this.pedidoSelected.pedUsu = this.form.value.usu!;
    this.pedidoSelected.pedPro = this.form.value.pro!;
    this.pedidoSelected.pedVrUnit = this.form.value.vrUnit!;
    this.pedidoSelected.pedCant = this.form.value.cant!;
    this.pedidoSelected.pedSubtot = this.form.value.subtot!;
    this.pedidoSelected.pedIVA = this.form.value.iva!;
    this.pedidoSelected.pedTotal = this.form.value.total!;

    if (this.isCreating) {
      this.pedidoService.create(this.pedidoSelected).subscribe(
        response => {
          console.log("Pedido creado correctamente.");
          console.log('updated');
        },
        (error) => {
          console.log(error);
          var alerta;
          if (error.error.title)
            alerta = "Error: " + error.error.title;
          else if (error.error)
            alerta = "Error: " + error.error;

          alert(alerta);
        }
      )
    } else {
      var x = this.pedidoService.update(this.pedidoSelected.pedID, this.pedidoSelected).subscribe(
        response => {
          console.log('updated');
          alert("Pedido actualizado correctamente.");
        },
        (error) => {
          console.log(error);
          
          var alerta;
          if (error.error.title)
            alerta = "Error: " + error.error.title;
          else if (error.error)
            alerta = "Error: " + error.error;

          alert(alerta);
        }
      )
    }
    
    console.log(this.pedidoSelected);
  this.pedidoSelected = {} as Pedido;
  this.isCreating = false;
  console.log('ACA');
}


cancel() {
  this.pedidoSelected = {} as Pedido;
  this.form.reset();
}

deletePedido(index: number) {
  if (confirm('¿Está seguro que desea eliminar el producto?')) {
    this.pedidoService.delete(index).subscribe(
      response => {
        console.log("Pedido eliminado correctamente.");
        console.log('updated');
      },
      (error) => {
        console.log('error');
      }
      )
    this.ngOnInit();
  }
}

addPedido() {
  this.isCreating = true;
  this.Pedidos.push({
    pedID: this.Pedidos.length + 1,
    pedUsu:0,
    pedPro: 0,
    pedVrUnit: 0,
    pedCant: 0,
    pedSubtot: 0,
    pedIVA: 0,
    pedTotal: 0
  })
}  
  
  ngOnInit() {
    this.pedidoService.getAll().subscribe (
      response => {
        this.Pedidos = response;
        console.log(response);
      }
    )
  }

}
