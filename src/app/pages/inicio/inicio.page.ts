import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataBaseService } from '../../services/data-base.service';
import { Usuario } from '../../model/Usuario';
import { showAlertDUOC, showAlertYesNoDUOC } from '../../model/Message';
import { MessageEnum } from '../../model/MessageEnum';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,QrComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent],
  standalone: true
})
export class InicioPage implements OnInit {
  usuario: Usuario | undefined = new Usuario();

  listaUsuarios: Usuario[] = [];
  nombre = '';
  componente_actual="";


  constructor(private bd: DataBaseService, private authService: AuthService) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.authService.logout();
  }
  cambiarComponente(event: any){
    this.componente_actual = event.detail.value;

  }

}

