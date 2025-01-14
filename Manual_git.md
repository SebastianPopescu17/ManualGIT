# Manual de Usuario: Git con Archivos de Código

## PASO 1: CONFIGURACIÓN INICIAL DE GIT
Configura tu nombre y correo en Git con los siguientes comandos: 
git config --global user.name ""
git config --global user.email ""

## PASO 2: INICIALIZAR UN REPOSITORIO GIT
Abre la terminal de Visual Studio Code.
Haz clic en Terminal > Nueva terminal.
Inicializa el repositorio con el siguiente comando: git init
Esto convierte la carpeta ManualGIT en un repositorio Git.
Verifica el estado del repositorio: git status
El archivo prueba.java aparece como "Untracked" porque no está rastreado aún.

## PASO 3: AÑADIR EL ARCHIVO AL ÁREA DE PREPARACIÓN
Añade el archivo al área de preparación (staging): git add prueba.java
Esto indica a Git que debe rastrear este archivo.
Verifica nuevamente el estado: git status
Ahora, el archivo aparecerá como "Changes to be committed".

## PASO 4: CREAR EL PRIMER COMMIT
Haz un commit para guardar este punto de control: git commit -m "Añado el archivo prueba.java."
El mensaje describe las acciones que realizamos en ese commit.

## PASO 5: CREAR UN REPOSITORIO REMOTO
Ve a la página de GitHub, inicia sesión y crea un repositorio con el nombre que desees. 
En la creación del repositorio no marques la casilla inicializar con un README.
Una vez hecho esto copias el enlace HTTPS del repositorio.

## PASO 6: CONECTAR EL REPOSITORIO LOCAL AL REMOTO
Conecta el repositorio local al remoto con el siguiente comando: git remote add origin https://github.com/SebastianPopescu17/ManualGIT.git
Reemplaza el enlace con el que copiaste de GitHub para tu propio repositorio remoto.
Verifica que la conexión sea correcta: git remote -v

## PASO 7: SUBIR LOS CAMBIOS AL REPOSITORIO REMOTO
Sube los cambios de la rama principal (a veces esta rama se llama main o master) al repositorio remoto: git push -u origin main
Ve a tu repositorio en GitHub y verifica que el archivo prueba.java está visible.

## PASO 8: MODIFICAR EL ARCHIVO Y REALIZAR NUEVOS COMMITS
Abre tu archivo, en este caso prueba.java, realiza cambios en el archivo y guárdalo.
Se añade de nuevo el archivo a la zona de preparación con git add prueba.java y se hace otra vez git commit -m "He agregado otra función al archivo prueba.java."
Se suben los cambios al repositorio remoto con git push.

## PASO 9: CREAR NUEVA RAMA Y HACER CAMBIOS
Para crear una nueva rama, usa el siguiente comando:
git checkout -b nueva-rama
Agrega los archivos modificados: git add *
Este comando lo que hace es agregar todos los archivos, no solo el que se ha modiificado.
Realizamos un commit sobre los cambios: git commit -m "He añadido el archivo meteo.js en la rama creada."
Para subir los cambios a la nueva rama en GitHub: git push -u origin nueva-rama

## ENLACE AL REPOSITORIO REMOTO
https://github.com/SebastianPopescu17/ManualGIT.git

