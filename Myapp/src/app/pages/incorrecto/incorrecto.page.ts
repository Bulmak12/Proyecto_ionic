import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {

  constructor(private router: Router) { } // Agrega Router como dependencia

  ngOnInit() {
  }

  public redirectToHome(): void {
    this.router.navigate(['/']); // Redirige a la página de inicio (tu página de inicio de sesión)
  }
}