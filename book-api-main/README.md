
# BOOK-API📓

## Descripción

Ésta es una API creada por estudiantes de ADA itw para el módulo de Node.js. 
Generamos un sistema de gestión de una biblioteca que permite administrar libros, autores y editoriales. Cada uno de ellos tiene su propio id generado por medio de UUID. Se usó el patrón de diseño MVC (Modelo - Vista - Controlador) y además se complementó utilizando una comunicación TCP entre un servidor y un cliente local, de ésta manera se permite interactuar con la información, utilizando los comandos predeterminados que se explican a continuación.

# ¡Empecemos!

![empecemos!](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVnY2MyMHgzdTRnZnVic3l0NXdmbTE0aDNkcm54MHV1MDZ1eWgzdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMcB8XospGZO8UQq87/giphy.gif)

## Instalación ⏬
```bash
git clone https://github.com/constanzagra/book-api
cd book-api
npm install
npm start (Este comando se ejecuta en una terminal)
node client.js (Este comando se ejecuta en otra terminal)
```
**¡IMPORTANTE!**
Recordá ejecutar primero el server y luego el cliente para no tener errores en la comunicación.

## Uso Comandos 🚀

**GET AUTHORS** : Busca y muestra por pantalla todos los autores que se encuentran.
- Ejemplo: ```GET AUTHORS ```

**GET PUBLISHERS**: Busca y muestra por pantalla todas las editoriales.
- Ejemplo: ```GET PUBLISHERS ```

**GET BOOKS**: Busca y muestra por pantalla todos los libros.
- Ejemplo: ```GET BOOKS ```

**ADD BOOK**: Permite añadir un libro a la lista, se solicitará que se ingrese el título y el nombre del autor del libro una vez ejecutado el comando.

- 1. ```ADD BOOK ``` (Sólo se escribe este comando primero)
- 2. Aparecerá la lista de autores disponibles, se debe elegir el autor del libro. En caso de que no esté el autor en la lista, se debe agregar primero un autor nuevo
- 3. Aparecerá la lista de editoriales disponibles, se debe elegir la editorial del libro. En caso de que no esté la editorial en la lista, se debe agregar primero una editorial nueva
- 4. Finalmente se escribe el nombre del libro

**ADD AUTHOR**: Permite añadir un autor ingresando los datos dentro del mismo comando.  
- El formato a utilizar es "ADD AUTHOR nombre nacionalidad" 
- Ejemplo: ```ADD AUTHOR Sebastian Fitzek Aleman```

**ADD PUBLISHER**: Permite añadir una editorial ingresando los datos dentro del mismo comando. 
- El formato a utilizar es "ADD PUBLISHER nombre país"
- Ejemplo: ```ADD PUBLISHER Santillana Argentina```

**SEARCH BOOK BY TITLE**: Permite buscar un libro por título.
- El formato a utilizar es "SEARCH BOOK BY TITLE título"
- Ejemplo: ``` SEARCH BOOK BY TITLE RAYUELA ```

**SEARCH BOOK BY AUTHOR**: Permite buscar un libro por autor.
- El formato a utilizar es "SEARCH BOOK BY AUTHOR autor"
- Ejemplo: ``` SEARCH BOOK BY AUTHOR Mariana Enriquez ```

**SEARCH AUTHOR**: Permite buscar un autor por nombre o nacionalidad.
- El formato a utilizar es "SEARCH AUTHOR nombre || nacionalidad" 
- Ejemplo: ``` SEARCH AUTHOR Julio Cortazar  ```

**SEARCH PUBLISHER**: Permite buscar una editorial por nombre o ubicación.
- El formato a utilizar es "SEARCH PUBLISHER nombre || ubicación"
- Ejemplo: ``` SEARCH PUBLISHER Argentina ```


**DEMO**
![image](https://github.com/user-attachments/assets/7eb4cab2-974b-45d7-a8b7-882b6db9fc08)


## Autoras 🕵️‍♂️

- [Constanza Riveros Ayala ](https://github.com/constanzagra)

- [Fiorella Rodriguez Mateo ](https://github.com/fiorellam)

- [Giselle Rastenis ](https://github.com/GegeRastenis)

- [Victoria Medone ](https://github.com/victoriamedone)
