import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class IngresoPage implements OnInit {

  correo = 'atorres@duocuc.cl';
  password = '1234';

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.authService.logout();
  }
  ingresar() {
    this.authService.login(this.correo, this.password);
  }
  public recuperar(): void {
    this.router.navigate(['/recuperar']); // Navegamos hacia el Home y enviamos la información extra
  }

  public registrar(): void {
    this.router.navigate(['/registro']);
  }
}
