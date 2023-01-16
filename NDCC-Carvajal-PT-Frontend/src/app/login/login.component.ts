import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'NDCC | Carvajal Prueba Técnica';
  public usuario: Usuario = new Usuario();
  public errorDescription: String = '';

  constructor (private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    console.log('iniciado');
    console.log('iniciado');
    console.log('iniciado');
  }
  
  authenticate() {

    this.authService.login(this.usuario).subscribe (

      response => {
        this.router.navigate(['menu-principal']);
        this.authService.login_successfull();
        console.log(response);
      },
      error => {
        console.log('Ocurrió un error: ', error.error);
        this.errorDescription = error.error;
      }
    )

  }


}
