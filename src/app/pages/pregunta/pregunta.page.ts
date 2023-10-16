import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  usuario: Usuario | undefined = new Usuario();
  preguntaSecreta = this.usuario?.preguntaSecreta;
  respuestaSecreta: string = '';
  listaUsuarios: Usuario[] = [];

  constructor(private bd: DataBaseService,private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
    })
  }
   verificarRespuesta()  {
    this.authService.verificarRespuesta(this.respuestaSecreta);    
    }
    verificarPregunta()  {
      this.authService.verificarPregunta(this.respuestaSecreta);    
      }
  public ingreso(): void {
    this.router.navigate(['ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }
  public correcto(): void {
    this.router.navigate(['correcto']); // Navegamos hacia el Home y enviamos la información extra
  }
}
