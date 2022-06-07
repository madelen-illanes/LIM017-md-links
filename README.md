## 1. Markdown Links

Markdown Links es una librería que usa [Node.js](https://nodejs.org/), que lee y analiza archivos
en formato `Markdown`, para verificar los links que contenga y reporta estadísticas.

## 2. Instalación:tw-1f518:

Instale la librería ejecutando el siguiente código:

npm install md-Links-made

## 3. Instrucciones de uso :tw-1f4bb:

Puedes ingresar dos opciones: --validate y/o --stats

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
* `options`: Un objeto con **únicamente** la siguiente propiedad:

  `validate`: Booleano que determina si se desea validar los links
    encontrados..

#### Ingreso sin opciones:

md-Links path

Se obtienen los siguientes datos:
```sh
* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
```
![!--validate!--stats](https://github.com/madelen-illanes/LIM017-md-links/blob/rama1/src/images/!--validate!--stats.png)

#### Opción --validate

Se obtienen los siguientes datos:
```sh
* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.
```
![--validate](https://github.com/madelen-illanes/LIM017-md-links/blob/rama1/src/images/--validate.png)

#### Opción --stats

Se obtienen los siguientes datos:

```sh
Total: 3
Unique: 3
```

![--stats](https://github.com/madelen-illanes/LIM017-md-links/blob/rama1/src/images/--stats.png)

#### Opción --validate --stats

Se obtienen los siguientes datos:

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
![--validate--stats](https://github.com/madelen-illanes/LIM017-md-links/blob/rama1/src/images/--validate--stats.png)

## 4. Autor :tw-1f33b:

Madelen Illanes
