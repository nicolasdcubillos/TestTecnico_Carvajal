import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import * as CryptoJS from 'crypto-js';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {}
  
  usuarios: Usuario[] = [];
  isCreating = false;

  userSelected: Usuario = {} as Usuario;

  form = this.fb.group({
    id: [0, [Validators.required]],
    nombre: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
 });

  selectUser(user: Usuario) {
    if(Object.keys(this.userSelected).length === 0) {
      this.userSelected = user;

      this.form.patchValue({
        id: user.usuID,
        nombre: user.usuNombre.toString(),
        contrasena: ''
      })
    }
  }

  update() {
    this.userSelected.usuNombre = (this.form.value.nombre?.toString())!;
    this.userSelected.usuPass = (this.form.value.contrasena?.toString())!;
    if (this.isCreating) {
      this.usuarioService.create(this.userSelected).subscribe(
        response => {
          alert("Usuario creado correctamente.");
          console.log('updated');
          this.ngOnInit();
        },
        (error) => {
          console.log('error');
        }
      )
    } else {
      this.usuarioService.update(this.userSelected.usuID, this.userSelected).subscribe(
        response => {
          alert("Usuario actualizado correctamente.")
          console.log('updated');
        },
        (error) => {
          var alerta;
          if (error.error.title)
            alerta = "Error: " + error.error.title;
          else if (error.error)
            alerta = "Error: " + error.error;

          alert(alerta);
        }
      )
    }
    
    console.log(this.userSelected);
  this.userSelected = {} as Usuario;
  this.form.reset(); 
  this.isCreating = false;
  this.ngOnInit();
}


deleteUser(index: number) {
  if (confirm('¿Está seguro que desea eliminar el usuario?')) {
    this.usuarioService.delete(index).subscribe(
      response => {
        alert("Usuario eliminado.");
        console.log('updated');
      },
      (error) => {
        console.log('error');
      }
      )
    this.ngOnInit();
  }
}

addUser() {
  this.isCreating = true;
  this.usuarios.push({
    usuID: this.usuarios.length + 1,
    usuNombre: '',
    usuPass: ''
  })
}  

cancel() {
  this.userSelected = {} as Usuario;
  this.form.reset();
}
  
  ngOnInit() {
    this.usuarioService.getAll().subscribe (
      response => {
        this.usuarios = response;
        console.log(response);
      }
    )
  }

}
