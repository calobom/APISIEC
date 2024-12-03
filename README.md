# API de Firmas Espectrales

Este proyecto es una API desarrollada en Node.js utilizando Express y Sequelize para gestionar datos relacionados con firmas espectrales.

## Requisitos

- Node.js v20.17.0
- PostgreSQL
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://gitlab.igac.gov.co/CIAF/sig_firmas_espectrales-api.git
    ```

2. Instala las dependencias:

    ```bash
    cd api-firmas-espectrales
    npm install
    ```

3. Configura las variables de entorno en un archivo `.env` con la información de claves jwt y ruta de los archivos :

    ```env
    JWT_SECRET=clave
    JWT_REFRESH_SECRET=secretclave
    FILE_UPLOAD_PATH=uploads

    ```

4. Ejecuta el servidor:

    ```bash
    node app.js
    ```

## Endpoints

### Autenticación

Se utilizan JWT (JSON Web Tokens) para la autenticación de usuarios.

#### Login

- **URL:** `/auth/login`
- **Método:** `POST`
- **Descripción:** Autentica un usuario y devuelve un token de acceso, un refresh token y expire.
- **Cuerpo de la solicitud:**

    ```json
    {
        "nombreusuario": "usuario",
        "contrasena": "contrasena"
    }
    ```

- **Respuesta exitosa:**

    ```json
    {
        "accessToken": "token_jwt",
        "refreshToken": "token_refresh",
        "expire": 1726068514000,
        "user": {
        "id_usuario": "1234",
        "nombreusuario": "usuario"
    }
    }
    ```

### Firmas Espectrales

#### Obtener todas las firmas espectrales

- **URL:** `/firmas-espectrales`
- **Método:** `GET`
- **Descripción:** Retorna todas las firmas espectrales.

#### Obtener una firma espectral por ID

- **URL:** `/firmas-espectrales/:id`
- **Método:** `GET`
- **Descripción:** Retorna una firma espectral específica por su ID.

#### Crear una nueva firma espectral

- **URL:** `/firmas-espectrales`
- **Método:** `POST`
- **Descripción:** Crea una nueva firma espectral.
- **Cuerpo de la solicitud:**

    ```json
    {
        "codigofirma": "FIRSIEC-TST-20240903-1140",
        "projectname": "Proyecto ABC",
        "campananame": "Campaña XYZ",
        "divipoladepto": "11",
        "divipolamunicipio": "11001",
        "instrumentname": "Espectrómetro 3000",
        "covertype": "Bosque Tropical",
        "sealevelaltitude": 250.5,
        "photosignature": "firma_foto_123",
        "spectralintegrity": 95.4,
        "shape": {
            "type": "Point",
            "coordinates": [-74.08175, 4.60971]
        }
    }
    ```

### Archivos

#### Subir un archivo relacionado con una firma

- **URL:** `/api/upload`
- **Método:** `POST`
- **Descripción:** Sube un archivo y lo asocia con una firma.
- **Cuerpo de la solicitud:** Formulario `multipart/form-data` con los siguientes campos:

    - `codigofirma` (String)
    - `file` (archivo a subir)
    - `numero_archivo` (String)
    - `id_tipo_archivo` (String)

- **Respuesta exitosa:**

    ```json
    {
    "message": "Archivo cargado y registrado correctamente",
    "file": {
        "id_archivo": "4",
        "codigofirma": "FIRSIEC-TST-20240903-1140",
        "fecha_archivo": "2024-09-12T00:43:44.781Z",
        "numero_archivo": "1",
        "id_tipo_archivo": "1171",
        "nombre_archivo": "1726083824741.png",
        "ruta_archivo": "uploads\\1726083824741.png"
        }
    }
    ```

## CORS

Este API permite solicitudes desde cualquier origen con los siguientes métodos habilitados:

- GET, POST, PUT, DELETE, OPTIONS

Se utiliza el middleware `cors` en Express para habilitar las políticas CORS necesarias:

```javascript
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

