import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { 
    path: 'productos', component: ProductosComponent, canActivate : [AuthGuard]
  },
  {
    path: 'menu-principal', component: MenuPrincipalComponent, canActivate : [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'usuarios', component: UsuariosComponent, canActivate : [AuthGuard]
  },
  {
    path: 'productos', component: ProductosComponent, canActivate : [AuthGuard]
  },
  {
    path: 'pedidos', component: PedidosComponent, canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
