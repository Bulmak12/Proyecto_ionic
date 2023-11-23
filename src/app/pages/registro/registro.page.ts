import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { capSQLiteChanges, DBSQLiteValues } from '@capacitor-community/sqlite';
import { showAlertDUOC, showAlertError } from '../../model/Message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage {

  correo = '';
  password = '';
  nombre = '';
  apellido = '';
  preguntaSecreta = '';
  respuestaSecreta = '';
  sesionActiva = '';
  cantidad = 0;

  constructor(private router: Router, private db: DataBaseService) { }

  ionViewWillEnter(): void {
    this.setUsersLength();
  }

  setUsersLength() {
    this.db.readUsers().then((resp: DBSQLiteValues) => {
      this.cantidad = resp.values?.length || 0; // Handle undefined values
    }).catch((err) => {
      showAlertError('RegistroPage.setUsersLength', err);
    });
  }

  async guardarUsuario() {
    try {
      this.sesionActiva = 'N';
      const resp: capSQLiteChanges = await this.db.createUser(
        this.correo,
        this.password,
        this.nombre,
        this.apellido,
        this.preguntaSecreta,
        this.respuestaSecreta,
        this.sesionActiva
      );
  
      if (resp?.changes?.changes === 1) {
        showAlertDUOC('Su cuenta fue creada con éxito');
        this.router.navigate(['login']);
      } else {
        showAlertDUOC('Su cuenta no pudo ser creada con éxito. Comuníquese con el Administrador del Sistema o intente nuevamente más tarde');
      }
    } catch (err) {
      const error = err as Error; // Convertir el tipo unknown a Error
      showAlertError('RegistroPage.guardarUsuario', error);
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  public ingreso(): void {
    this.router.navigate(['ingreso']); // Navegamos hacia el Home y enviamos la información extra
  }
}