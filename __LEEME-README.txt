Programas Fuentes Aplicaciones Móviles
--------------------------------------

DESARROLLADOS POR EL PROFESOR
-----------------------------

Cristián Gómez Vega
cri.gomezv@profesor.duoc.cl
cgomezvega@triskeledu.cl
cgomezvega@gmail.com


Creación de tu proyecto
----------------------------

Para crear tu proyecto debes usar el comando:

ionic start miproyecto


Actualización de componentes
----------------------------

Una vez creado el proyecto debes actualizar los paquetes de node a los paquetes de este año, ejecutando en Windows:

_update-components.bat

Si es Ubuntu se ejecuta:

sh _update-components.sh


Sobre los programas fuentes
------------------------------

Los programas fueron comprimidos sin las carpetas node_module, por lo que antes de ejecutar el programa, se debe ingresar a la carpeta del proyecto y ejecutar el siguiente comando para volver a cargar los paquetes desde Internet:

npm install

Luego para ejecutar el proyecto en un navegador, se debe ingresar a la carpeta del proyecto y ejecutar el siguiente comando

ionic serve

2. En la App de código QR nativo hay un README dentro de la carpeta raíz con instrucciones para modificar el AndroidManifest.xml, para dar permisos a la cámara del celular.


Scripts de utilidad
------------------------------

Los scripts .bat de Windows se ejecutan directamente en la consola, pero los de Ubuntu necesitan usar el comando "sh", por ejemplo: "sh _update-components.sh"

El uso de los scripts en Windows es el siguiente:

_global-update-components.bat  Actualiza los paquetes de node globalmente
_update-components.bat         Actualiza componentes de la App a versiones de este año
_install-npm.bat               Instala los paquetes de node en la App
_ionic-serve.bat               Ejecuta la App en el navegador
_add-android.bat               Agrega soporte de Android con Capacitor
_build.bat                     Compila la App
_build-run-android.bat         Compila y ejecuta la App en Android
_run-android.bat               Ejecuta la App en Android con Live Reload

El uso de los scripts en Ubuntu es el siguiente:

sh _global-update-components.bat  Actualiza los paquetes de node globalmente
sh _update-components.bat         Actualiza componentes de la App a versiones de este año
sh _install-npm.bat               Instala los paquetes de node en la App
sh _ionic-serve.bat               Ejecuta la App en el navegador
sh _add-android.bat               Agrega soporte de Android con Capacitor
sh _build.bat                     Compila la App
sh _build-run-android.bat         Compila y ejecuta la App en Android
sh _run-android.bat               Ejecuta la App en Android con Live Reload

Además en Ubuntu se cuenta con:

sh _install-node-18.10.0.sh       Instala node desde cero usando nvm (usar con cuidado)
sh _uninstall-node.sh             Desinstala node por completo (usar con cuidado)


Archivos de configurción de VSCode
----------------------------------

Sirven para configurar una mejor forma de usar VSCode con nuestro proyecto. La documentación de los archivos la puedes ver dentro de las carpetas:

_vscode-ubuntu
_vscode-windows

que se encuentran dentro de .vscode


Cómo crear servicios de base de datos en SQLite
-----------------------------------------------

Leer: Ionic 7 SQLite Database CRUD App Example Tutorial using Angular and @capacitor-community/sqlite
Link: https://jepiqueau.github.io/2023/08/26/Ionic7Angular-SQLite-CRUD-App.html

Hacer lo siguiente:

  ionic start ionic7-angular-sqlite-app blank --type=angular --capacitor
  cd ./ionic7-angular-sqlite-app

  npm install --save @capacitor-community/sqlite
  npm install --save @capacitor/toast
  npm install --save @ionic/pwa-elements
  npm install --save-dev copyfiles

  ng g class upgrades/user.upgrade.statements 
  ng g interface models/user
  ng g class services/sqlite.service
  ng g class services/storage.service
  ng g class services/dbname-version.service
  ng g class services/initialize.app.service
  ng g component components/users
