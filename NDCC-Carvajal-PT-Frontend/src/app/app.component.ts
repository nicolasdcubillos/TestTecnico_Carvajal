import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Usuario } from './model/usuario.model';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  logout() {
    this.authService.logout();
  }
}