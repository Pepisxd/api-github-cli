# TMBD_CLI #
### Este es un proyecto basico donde a través de una interfaz de linea de comandos buscamos datos sobre peliculas en una base de [TMBD](https://developer.themoviedb.org/docs/getting-started).
Este proyecto contiene las siguientes herramientas y bibliotecas
1. Node.js
   - Plataforma necesaria para ejecutar javascript en el servidor y poder construir la aplicación CLI.

2. Axios
   - Para realizar solicitudes HTTP a la API de TMDB.

3. Commander
   - Para manejar y parsear argumentos en la línea de comandos.
  
4. Chalk
   - Biblioteca para agregar colores y estilo a la salida de la terminal, haciendo que el CLI sea más legible.

5. Dotenv
   - Para manejar las claves de la API de forma segura almacenandolas en un archivo .env.

6. Ora:
   -Para mostrar indicadores de carga mientras se realiza una solicitud.

Esta aplicacion se ejecuta mediante el siguiente comando 
```javascript
node TMBD_CLI.js [option] [argumento]
```

En este caso option solo permite el parametro "movie" y el argumento (popular, top_rated, upcoming, now_playing) que son los que especifia la categoria de películas a mostrar
