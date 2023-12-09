import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { log, showAlertError, showToast } from '../model/Message';
import { Usuario } from '../model/Usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';

@Injectable()

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  correo = '';
  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { }

  inicializarAutenticacion() {
    this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async login(correo: string, password: string) {
    await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
      if (usuario) {
        showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(correo, 'S');
        this.storage.set(this.keyUsuario, usuario);
        this.usuarioAutenticado.next(usuario);
  
        // Aquí identificamos si el usuario es admin
        const esAdmin = this.verificarSiEsAdmin(usuario); // Implementa esta función
        if (esAdmin) {
          // Si es admin, navega al dashboard de admin
          this.router.navigate(['inicio']);
        } else {
          // Si no es admin, navega al dashboard de usuario normal
          this.router.navigate(['inicio']);
        }
      } else {
        showToast(`El correo o la contraseña son incorrectos`);
        this.router.navigate(['/ingreso']);
      }
    });
  }

  async verificarcorreo(correo: string) {
    await this.bd.ValidarCorreo(correo);
  }
  async verificarPregunta(preguntaSecreta: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.router.navigate(['pregunta']);
      } else {
        await this.bd.leerUsuario(preguntaSecreta).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            this.router.navigate(['pregunta']);
          } else {

          }
        });
      }
    });
  }
  async verificarRespuesta(question: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.router.navigate(['correcto']);
      } else {
        await this.bd.ValidarRespuesta(question).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            this.router.navigate(['correcto']);
          } else {
            this.router.navigate(['incorrecto']);

          }
        });
      }
    });
  }
  verificarSiEsAdmin(usuario: Usuario): boolean {
    // Verifica si el campo 'tipo' del usuario es igual a 'admin'
    return usuario && usuario.correo === 'admin';
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(usuario.correo, 'N');
        this.storage.remove(this.keyUsuario);
        this.usuarioAutenticado.next(null);
        this.router.navigate(['ingreso']);
      } else {
        this.router.navigate(['ingreso']);
      }
    })

  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    return this.storage.get(this.keyUsuario).then(usuario => usuario as Usuario);
  }
  setUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }
}
