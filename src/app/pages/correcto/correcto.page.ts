import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private bd: DataBaseService,    private activeroute: ActivatedRoute,
    private authService: AuthService,private router: Router) { 
    this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
      const navigation = this.router.getCurrentNavigation();
      if (navigation) {
        if (navigation.extras.state) { // Validar que tenga datos extras
          // Si tiene datos extra, se rescatan y se asignan a una propiedad
          this.usuario = navigation.extras.state['usuario'];
        }}
  });
  }
  ionViewWillEnter(): void {

  }
  ngOnInit() {
  }
  public ingreso(): void {
    this.router.navigate(['/ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }
}
