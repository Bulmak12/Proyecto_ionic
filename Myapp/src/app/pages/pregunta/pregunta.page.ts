import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | null;
  public respuesta: string = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = null; // Inicializa con null u otro valor por defecto

    this.activedRoute.queryParams.subscribe((params) => {
      const navigationState = this.router.getCurrentNavigation()?.extras?.state;
      if (navigationState && 'usuario' in navigationState) {
        this.usuario = navigationState['usuario'];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/correcto'],navigationExtras)
    } else {
      this.router.navigate(['/incorrecto'])
    }
  }

  ngOnInit() {}
}