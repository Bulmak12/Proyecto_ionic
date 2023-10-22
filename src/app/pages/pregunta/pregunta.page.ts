import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavigationExtras,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  usuario: Usuario | undefined = new Usuario();
  preguntaSecreta = '';
  respuestaSecreta: string = '';
  listaUsuarios: Usuario[] = [];

  constructor(private bd: DataBaseService,private activedRoute: ActivatedRoute,private authService: AuthService,private router: Router) {  
    this.activedRoute.queryParams.subscribe((params) => {
    const navigationState = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationState && 'usuario' in navigationState) {
      this.usuario = navigationState['usuario'];
    } else {
      this.router.navigate(['/login']);
    }
  });
}

  ngOnInit() {
    // recibir el usuario del navigation extras y almacenarlo en 
    // la propiedad usuario de esta pagina

  }

  ionViewWillEnter(): void {

  }

   verificarRespuesta()  {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuestaSecreta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/correcto'],navigationExtras)
    } else {
      this.router.navigate(['/incorrecto'])
    }
        // comparar la respuesta digitada por el usuario con la resuesta de la variable usuario
  }

  public ingreso(): void {
    this.router.navigate(['ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }

  public correcto(): void {
    this.router.navigate(['correcto']); // Navegamos hacia el Home y enviamos la información extra
  }
}
