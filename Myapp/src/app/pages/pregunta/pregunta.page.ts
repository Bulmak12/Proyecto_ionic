import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario;
  public respuesta: string = '';
  public respuestaIncorrecta: boolean = false;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = new Usuario('', '', '', '', '', '');

    this.activeroute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }

      // Redirige al usuario a la página de inicio de sesión (login)
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcto'])
    } else {
      this.router.navigate(['/incorrecto'])
      // Aquí puedes decidir si redirigir al usuario a alguna página en caso de respuesta incorrecta
      // Por ejemplo, redirigirlo a una página de recuperación de contraseña
      // this.router.navigate(['/recuperar-contrasena']);
    }
  }
}