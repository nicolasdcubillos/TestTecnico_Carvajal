import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../services/usuario.service';

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
    
  }
  
  authenticate() {

    this.authService.login(this.usuario).subscribe (

      response => {
        response
        this.router.navigate(['productos']);
        this.authService.login_successfull(response);
        console.log(response);  
      },
      error => {
        console.log('Ocurrió un error: ', error.error);
        this.errorDescription = error.error;
      }
    )

  }


}
