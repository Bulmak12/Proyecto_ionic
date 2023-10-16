import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataBaseService } from '../../services/data-base.service';
import { Usuario } from '../../model/Usuario';
import { showAlertDUOC, showAlertYesNoDUOC } from '../../model/Message';
import { MessageEnum } from '../../model/MessageEnum';
@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class MisdatosComponent implements ViewWillEnter {
  
  usuario: Usuario | undefined = new Usuario();

  listaUsuarios: Usuario[] = [];
  nombre = '';
  
  constructor(private bd: DataBaseService, private authService: AuthService) { }

  ionViewWillEnter(): void {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
    })
  }

  cerrarSesion() {
    this.authService.logout();
  }

  generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async crearUsuariosDePrueba() {
    const u: Usuario = new Usuario();
    u.setUsuario(this.generarNumeroAleatorio(1, 999999) + 'a@duocuc.cl', '1234', this.nombre, '', 'Animal favorito', 'gato', 'N', false);
    await this.bd.guardarUsuario(u);
  }

  async eliminarUsuario(usuario: any){
    const usu = await this.bd.leerUsuario(usuario.correo);
    if (usu) {
      const resp = await showAlertYesNoDUOC(`¿Está seguro que desea eliminar el usuario ${usu.nombre}?`);
      if (resp === MessageEnum.YES) {
        await this.bd.eliminarUsuarioUsandoCorreo(usuario.correo);
      }
    } else {
        showAlertDUOC('El usuario que desea eliminar no existe en la base de datos');
    }
  }
}

