import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
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
  ionViewWillEnter(): void {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
    })
  }
  constructor(private bd: DataBaseService,private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
   pregunta()  {
    this.authService.verificarcorreo(this.correo);    
    }
  public ingreso(): void {
    this.router.navigate(['/ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }
}
