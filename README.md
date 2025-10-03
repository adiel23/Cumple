# Cumple

## Descripción

Este sistema tiene como finalidad registrar y consultar de forma sencilla las faltas de los estudiantes relacionadas al incumplimieto de las medidas de presentacion personal impulsadas por el MINED en todas las escuelas de El Salvador.

### Características principales

**DOCENTES**

- Registro de faltas.
- Login

**DIRECTOR/A Y SUBDIRECTORES/AS**

- Login
- Consulta de historial de faltas de un estudiante aplicando filtros opcionales (rango de fechas).
- Consulta de todas las faltas registradas en el sistema aplicando filtros opcionales (por grupo, por rango de fechas).
- Generacion de Reportes en PDF.

### Arquitectura

## Instalación / Requisitos

**NODE JS**

1. Instalar Nodejs y dar clic en siguiente en todo.
2. Ejecutar el comando npm i para descargar todas las dependencias del proyecto.

**MYSQL**

1. Del paquete de mysql community server solo instalar workbench y mysql server.

## USO ##

**Docentes**

Una vez se inicie sesión, la interfaz para docentes consta de un formulario con un input que dice NIE. En ese input el docente deberá buscar al estudiante ingresando su NIE y de entre todas las opciones que se le muestran seleccionar al estudiante cuyo nombre y sección coincide con los del estudiante al cual se le registrará la falta. Una vez seleccionado el estudiante ahora tendra que seleccionar una de las faltas por la cual se esta registrando al estudiante. Una vez seleccionada puede dar clic en registrar y la falta quedaria guardada.

**DIRECTORA Y SUBDIRECTORAS**

Una vez se inicie sesión, la interfaz para la dirección consta de 2 pantallas principales. Una para ver las faltas en general y la otra para ver el historial de faltas de los estudiantes. En la primera pantalla, por defecto, se mostrarán todas las faltas registradas el dia en el que se accede al sistema. Usted podrá filtrar estas faltas por grupo y rango de fechas y si quiere puede descargar los resultados en PDF.

En la segunda pantalla se mostrarán todos los estudiantes de la institución y se podrá buscar un estudiante por su NIE y nombre. De este estudiante encontrado se podra ver su historial al dar clic en el botón ver historial. Se mostrará una pantalla con todas las faltas que se le han registrado a ese estudiante y usted podrá filtras esas faltas por tipo y rango de fechas y si quiere puede descargar los resultados en PDF.

## Capturas de pantalla

## Tecnologías usadas

- Nodejs
- MySQL
- HTML
- CSS
- javaScript

## Créditos / Autores

**Autor:** Adiel Arturo Elias Mercado.

**Creditos:** Lic. Maria Magdalena de Ramirez.

## Licencia

Licencia de software mensual, anual o compra completa.
