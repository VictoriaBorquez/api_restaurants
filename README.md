# API Restaurantes del mundo
Aplicación web que muestra a través de una tabla los restaurantes del mundo (Nombre, Ubicación, Tipo de comida, Calificación, Visitado). Permite agregar nuevos restaurantes, eliminar o editar los ya existentes, filtrar por nombre de restaurante y por tipo de comida, y ordenar de forma ascendente o descendente.

## :clapper: Demo



## Herramientas/Tecnologías utilizadas
- **Backend**: 

  <img src="https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png" width="120">  
  
  <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" width="120">  
  
  <img src="https://user-images.githubusercontent.com/66185308/219544998-7c87fa3b-10e0-4ec1-bbf3-fdc52473a03d.png" width="80"> 
  
  
- **Frontend**: 

  <img src="https://user-images.githubusercontent.com/66185308/217849249-3539ad82-1b5c-4599-ba09-620b04bb6782.png" width="60">
  
  <img src="https://seeklogo.com/images/M/material-ui-logo-5BDCB9BA8F-seeklogo.com.png" width="60">

## :memo: Instrucciones de uso

- **Clonar repositorio**:

  ```
    https://github.com/VictoriaBorquez/api_restaurants.git
  ```
 
 - **Instalar y Activar entorno virtual**:
  En carpeta backend 
   ```
   cd backend
   ```
   ```
   python3.10 -m venv venv
   ```
   ```
   source venv/bin/activate
   ```
 
- **Instalar requirements.txt python**:
  ```
  pip install -r requirements.txt
  ```
  
- **Modificar permisos archivo y Crear base de datos**:
   ```
  chmod +x create_db.sh
  ```
  ```
  ./create_db.sh
  ```


- **Correr Backend**:

  En una terminal:
  ```
  python main.py
  ```

- **Correr Frontend**:

  En otra terminal:
  ```
  npm start
  ```

- **Visualizar**:

  Abrir navegador: 
  http://localhost:3001

## Backend (Documentación API)

  http://0.0.0.0:8000/docs
  
  <table>
  <tr>
    <td>
    <p align="center">
    <img src="https://github.com/VictoriaBorquez/api_restaurants/assets/66185308/8cdbb66b-2868-4d3c-bd21-1dcc79e287f5" alt="https://github.com/VictoriaBorquez/api_restaurants/assets/66185308/8cdbb66b-2868-4d3c-bd21-1dcc79e287f5" width="800"/>
    </p>
    </td>
  </tr>
  </table>




  http://0.0.0.0:8000/redoc
  <table>
  <tr>
    <td>
    <p align="center">
    <img src="https://github.com/VictoriaBorquez/api_restaurants/assets/66185308/3acdc664-0dfd-4a37-9b60-42dbec0add34" alt="https://github.com/VictoriaBorquez/api_restaurants/assets/66185308/3acdc664-0dfd-4a37-9b60-42dbec0add34" width="800"/>
    </p>
    </td>
  </tr>
  </table>
