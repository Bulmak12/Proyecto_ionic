import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public usuario: Usuario;

  // CGV: Para poder trabajar con Router y poder navegar hacia la página "home", debemos primero pasar como
  // parámetro e instanciar un objeto de la clase "Router". Fijarse que el tipo de dato, que se pasa 
  // en el constructor es "Router" con mayúscula, porque se trata de una clase y éstas parten con letra 
  // mayúscula, mientras que "router" con minúscula es el objeto de esa clase, que usaremos para ejecutar
  // el método "navigate". La creación de parámetros "private" en el constructor se llama 
  // "Inyección de Dependencia" y es una práctica recomendada en Angular, que permite crear el objeto
  // como una propiedad más de la página y así poder usarla. Por otro lado, la "Inyección de Dependencia"
  // permite compartir una única instancia de dicho objeto en el resto de las páginas que lo usen. Lo
  // anterior es especialmente importante para mantener la coherencia y estados compartidos en los Servicios.
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '',)
  
    // Puedes descomentar cualquiera de los siguientes usuarios, para 
    // hacer tus pruebas y así no tener que digitarlos a cada rato

    // this.usuario.setUsuario('sin.datos@duocuc.cl', '1234');
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
    this.usuario.setUsuario('jperez@duocuc.cl', '5678');
    this.usuario.setUsuario('cmujica@duocuc.cl', '0987');
    // this.usuario.setUsuario('usuario.inexistente@duocuc.cl', '1234');
    // this.usuario.setUsuario('atorres@duocuc.cl', 'password mala');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999999999999');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999');
    // this.usuario.setUsuario('correo.malo', '0987');
    // this.usuario.setUsuario('correo.malo@', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc.', '0987');
    
  }
  public redirectToHome(): void {
    this.router.navigate(['/']); // Redirige a la página de inicio (tu página de inicio de sesión)
  }
  ngOnInit() {
  }

  
}
