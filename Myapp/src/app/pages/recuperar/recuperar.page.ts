import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  public correo: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  public IngresarPaginaValidarRespuestaSecreta(): void {
    const usuario = new Usuario('','','','','','');
    const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
    if (!usuarioEncontrado) {
      this.router.navigate(['/incorrecto'])
    }
    else {
      const navigationExtras: NavigationExtras = {
          state: {
            usuario: usuarioEncontrado

          }
        };
        this.router.navigate(['/pregunta'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
    }

  }
}