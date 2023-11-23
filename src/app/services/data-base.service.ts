import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable} from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { Usuario } from '../model/Usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { showAlert, showAlertDUOC, showAlertError } from '../model/Message';
import { capSQLiteChanges, DBSQLiteValues} from '@capacitor-community/sqlite';

@Injectable()
export class DataBaseService {

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
      CREATE TABLE IF NOT EXISTS USUARIO (
        correo TEXT PRIMARY KEY NOT NULL,
        password TEXT NOT NULL,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        preguntaSecreta TEXT NOT NULL,
        respuestaSecreta TEXT NOT NULL,
        sesionActiva TEXT NOT NULL
      );
      `]
    }
  ]

  nombreBD = 'basedatos';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  listaUsuariosFueActualizada: BehaviorSubject<boolean> = new BehaviorSubject(false);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  sqlDeleteUser = 'DELETE FROM USUARIO WHERE correo = ?';
  sqlSelectUser = 'SELECT * FROM Usuario WHERE correo=? AND password=? LIMIT 1';
  sqlSelectAllUsers = 'SELECT * FROM Usuario';
  sqlInsertUser = 'INSERT OR REPLACE INTO Usuario (correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta, sesionActiva) VALUES (?,?,?,?,?,?,?)';

  
  constructor(private sqliteService: SQLiteService) { }

  async inicializarBaseDeDatos() {

    // Crear base de datos SQLite
    await this.sqliteService.crearBaseDeDatos({database: this.nombreBD, upgrade: this.userUpgrades});

    // Abrir base de datos
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);

    // Para crear usuarios de prueba descomenta la siguiente línea
    await this.crearUsuariosDePrueba();

    // Cargar la lista de usuarios
    await this.leerUsuarios();
  }

  async crearUsuariosDePrueba() {
    const usu = new Usuario();
    usu.setUsuario('atorres@duocuc.cl', '1234', 'Ana', 'Torres', 'Nombre de mi mascota', 'gato', 'N', false);
    await this.guardarUsuario(usu);
    usu.setUsuario('avalenzuela@duocuc.cl', 'qwer', 'Alberto', 'Valenzuela', 'Mi mejor amigo', 'juanito', 'N', false);
    await this.guardarUsuario(usu);
    usu.setUsuario('cfuentes@duocuc.cl', 'asdf', 'Carla', 'Fuentes', 'Dónde nació mamá', 'valparaiso', 'N', false);
    await this.guardarUsuario(usu);
  }

  // Create y Update del CRUD. La creación y actualización de un usuario
  // se realizarán con el mismo método, ya que la instrucción "INSERT OR REPLACE"
  // revisa la clave primaria y si el registro es nuevo entonces lo inserta,
  // pero si el registro ya existe, entonces los actualiza.
  
  async guardarUsuario(usuario: Usuario) {
    const sql = 'INSERT OR REPLACE INTO USUARIO (correo, password, nombre, apellido, ' +
      'preguntaSecreta, respuestaSecreta, sesionActiva) VALUES (?,?,?,?,?,?,?);';
    await this.db.run(sql, [usuario.correo, usuario.password, usuario.nombre, usuario.apellido, 
      usuario.preguntaSecreta, usuario.respuestaSecreta, usuario.sesionActiva]);
    await this.leerUsuarios();
  }

  // Cada vez que se ejecute leerUsuario() la aplicación va a cargar los usuarios desde la base de datos,
  // y por medio de la instrucción "this.listaUsuarios.next(usuarios);" le va a notificar a todos los programas
  // que se subscribieron a la propiedad "listaUsuarios", que la tabla de usuarios se acaba de cargar. De esta
  // forma los programas subscritos a la variable listaUsuarios van a forzar la actualización de sus páginas HTML.

  // ReadAll del CRUD. Si existen registros entonces convierte los registros en una lista de usuarios
  // con la instrucción ".values as Usuario[];". Si la tabla no tiene registros.
  async leerUsuarios() {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
    this.listaUsuariosFueActualizada.next(true);
  }

  // Read del CRUD
  async leerUsuario(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;', [correo])).values as Usuario[];
    return usuarios[0];
  }
  async ValidarPreguntaSecreta() {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM preguntaSecreta;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
    this.listaUsuariosFueActualizada.next(true);
  }
  async ValidarRespuesta(question: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO WHERE respuestaSecreta=?;', [question])).values as Usuario[];
    return usuarios[0];
  }
  // Delete del CRUD
  async eliminarUsuarioUsandoCorreo(correo: string) {
    const sql = 'DELETE FROM USUARIO WHERE correo=?';
    await this.db.run(sql, [correo]);
    await this.leerUsuarios();
  }

  // Validar usuario
  async validarUsuario(correo: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO WHERE correo=? AND password=?;',
      [correo, password])).values as Usuario[];
    return usuarios[0];
  }
  async ValidarCorreo(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;',
      [correo])).values as Usuario[];
    return usuarios[0];
  }

  async ValidarPassword(password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO WHERE password=?;',
      [password])).values as Usuario[];
    return usuarios[0];
  }
  // Actualizar sesión activa
  async actualizarSesionActiva(correo: string, sesionActiva: string) {
    const sql = 'UPDATE USUARIO SET sesionActiva=? WHERE correo=?';
    await this.db.run(sql, [sesionActiva, correo]);
    await this.leerUsuarios();
  }

  async deleteUser(correo: string): Promise<capSQLiteChanges> {
    return await this.db.run(this.sqlDeleteUser, [correo]);
}

async readUsers(): Promise<DBSQLiteValues> {
  return await this.db.query(this.sqlSelectAllUsers);
}

async readUser(correo: string, password: string, hideSecrets: boolean): Promise<Usuario> {
  try {
    const rs = await this.db.query(this.sqlSelectUser, [correo, password]);

    console.log('Result:', rs);
    console.log('Values:', rs.values);

    if (!rs.values || rs.values.length === 0) {
      // Si no se encuentra un usuario, devolvemos un objeto Usuario vacío o con valores por defecto
      return new Usuario(); // Puedes establecer valores por defecto aquí si es necesario
    }

    const r = rs.values[0];
    const usu = new Usuario();

    usu.setUsuario(
      r.correo,
      r.password,
      r.nombre,
      r.apellido,
      r.preguntaSecreta,
      r.respuestaSecreta,
      r.sesionActiva,
      hideSecrets
    );

    return usu;
  } catch (error) {
    console.error('Error:', error);
    // Maneja el error devolviendo un objeto Usuario por defecto o maneja el error de otra manera según tu lógica
    return new Usuario(); // Puedes establecer valores por defecto aquí si es necesario
  }
}

//----------------------------------//

async createUser(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string, sesionActiva: string): Promise<capSQLiteChanges> {
  return await this.db.run(this.sqlInsertUser, [correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta, sesionActiva]);
}


}
