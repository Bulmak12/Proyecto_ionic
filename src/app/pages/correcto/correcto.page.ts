import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements ViewWillEnter {
  usuario: Usuario | undefined = new Usuario();
  password: string = '';
  listaUsuarios: Usuario[] = [];

  constructor(private bd: DataBaseService,private authService: AuthService,private router: Router) { }
  ionViewWillEnter(): void {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
    })
  }
  ngOnInit() {
  }
  verificarPassword()  {
    this.authService.verificarPassword(this.password);    
    }
  public ingreso(): void {
    this.router.navigate(['/ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }
}
