import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { log, showAlertError, showAlertYesNoDUOC } from 'src/app/model/Message';
import { MessageEnum } from 'src/app/model/MessageEnum';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface CustomEvent {
  correo: string;
  // Otras propiedades relevantes para tu evento personalizado, si las hay
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],  
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class AdminComponent implements OnInit {

  usuarios: Usuario[] = [];
  cantidad = 0;

  constructor(private db: DataBaseService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  async getUsuarios() {
    try {
      const usuarios = await this.db.leerUsuarios();
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        this.usuarios = usuarios;
        this.cantidad = usuarios.length;
      } else {
        this.usuarios = [];
        this.cantidad = 0;
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  }

  async eliminarUsuario(correo: string) {
    try {
      await this.db.eliminarUsuarioUsandoCorreo(correo);
      await this.getUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  }
}