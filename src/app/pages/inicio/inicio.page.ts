import { AuthService } from './../../services/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,QrComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent,
    AdminComponent,
    ],
  standalone: true
})
export class InicioPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  usuario: Usuario | undefined = new Usuario();
  esAdmin = false; // Variable para almacenar si el usuario es administrador o no
  componente_actual = "";

  constructor(private bd: DataBaseService, private authService: AuthService  , private alertController: AlertController // Permite mostrar mensajes emergentes mÃ¡s complejos que Toast
  , private animationController: AnimationController) { }

  ngOnInit() {
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        // Verificar si el usuario es administrador
        this.esAdmin = this.authService.verificarSiEsAdmin(usuario);
      }
    });
  }

  cerrarSesion() {
    this.authService.logout();
  }

  cambiarComponente(event: any) {
    this.componente_actual = event.detail.value;
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }
  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}