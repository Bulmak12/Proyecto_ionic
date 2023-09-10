import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public usuario: Usuario;
  public animationState: string = 'start'; // Agrega esta propiedad

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
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
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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

  limpiarFormulario(): void {
    this.usuario.nombre = '';
    this.usuario.apellido = '';

    this.animateItem(this.itemNombre.nativeElement);
    this.animateItem(this.itemApellido.nativeElement);
    this.animateItem(this.itemEducacion.nativeElement);
    this.animateItem(this.itemFechaNacimiento.nativeElement);
  }

  animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  mostrarDatosPersona(): void {
    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    let mensaje = '';
    if (this.usuario) {
      mensaje += '<br><b>Usuario</b>: <br>' + this.usuario.getCorreo();
      mensaje += '<br><b>Nombre</b>: <br>' + this.usuario.getNombre();
      mensaje += '<br><b>Apellido</b>: <br>' + this.usuario.getApellido();

      this.presentAlert('Datos personales', mensaje);
    }
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Agrega esta función para redirigir a la página qrreader
  public redirectToQRReader(): void {
    this.router.navigate(['/qrreader']);
  }
}
