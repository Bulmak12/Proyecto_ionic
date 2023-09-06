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
   constructor(
        private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
      , private router: Router // Permite navegar entre páginas
       ) { // Permite crear animaciones con  

    this.usuario = new Usuario('', '', '', '', '', '');
    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      // Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      // intentó entrar directamente a la página home sin pasar por el login,
      // de modo que el sistema debe enviarlo al login para que inicie sesión.
      this.router.navigate(['/login']);

    });
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      alert('CORRECTO!!! TU CLAVE ES ' + this.usuario.password);
    }
    else {
      this.router.navigate(['/incorrecto'])
    }
  }
}