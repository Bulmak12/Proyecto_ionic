import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarPage implements OnInit {
 usuario: Usuario | undefined = new Usuario();
  correo = '';
  listaUsuarios: Usuario[] = [];

  constructor(private bd: DataBaseService,private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  async pregunta()  {
    const usu: Usuario | undefined = await this.bd.ValidarCorreo(this.correo);
    if (usu) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
      // navegar a la pagina de pregunta
      // usar nivation extras para enviarle el usuario que acabo de validar
    } else {
      this.router.navigate(['/incorrecto'])
      // avisar que el correo no existe
    }
  }

  public ingreso(): void {
    this.router.navigate(['/ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }
}
