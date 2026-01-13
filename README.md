
# API Incidencias - Backend

API REST para gestionar incidencias, mantenimiento, máquinas, usuarios e informes. Proyecto construido con Node.js, Express y PostgreSQL.

**Estado:** Desarrollo

**Contenido rápido:**
- **Instalación**
- **Configuración (.env)**
- **Ejecución**
- **Endpoints principales**

## Requisitos
- Node.js (v16+ recomendado)
- PostgreSQL
- `npm`

## Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con estas variables (usa los valores apropiados):

```
PORT=3000
STRINGDB=postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>
SECRET_KEY=tuClaveSecreta
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

El repositorio incluye un archivo `baseDatos.sql` con esquema/seed inicial.

## Instalación
1. Clona o copia el proyecto.
2. Instala dependencias:

```bash
npm install
```

3. Configura el archivo `.env` con tus credenciales (ver sección anterior).
4. Crea la base de datos y aplica `baseDatos.sql` (ejemplo con psql):

## Scripts disponibles
Según `package.json`:

```bash
npm run dev   # arranca con nodemon (desarrollo)
npm start     # arranca en producción (node src/app.js)
```

## Ejecutar localmente
Con todo configurado, iniciar en modo desarrollo:

```bash
npm run dev
```

La API por defecto quedará en `http://localhost:3000` o en la URL definida en `BASE_URL`.

## Autenticación
La API usa JWT. Para obtener un token inicia sesión en el endpoint de autenticación y añade el header `Authorization: Bearer <token>` en peticiones protegidas.

## Endpoints principales
Las rutas principales se encuentran en `src/routes` y cubren los recursos:

- `auth` : registro / login
- `user` : gestión de usuarios
- `maquina` : gestión de máquinas
- `mantenimiento` : pedidos/ordenes de mantenimiento
- `incidencia` : crear / listar / actualizar incidencias
- `informe` : generación y descarga de informes (PDF)
- `archivo` : subida/descarga de archivos (usa Cloudinary)

Ejemplo de login (POST): `/api/auth/login` con `email` y `password`. Respuesta incluye `token`.

Ejemplo de petición protegida (GET usuarios):

```
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/api/user
```

Subida de archivo (multiparte) — revisa `src/routes/archivo.routes.js` para detalles de campo esperado.

## Cloudinary
Para usar subida de archivos configura `CLOUDINARY_URL` en el `.env`. La integración está en `src/configs/cloudinary.js`.

## Helpers y middlewares
- `src/helpers/jwt.js` - funciones auxiliares JWT
- `src/middlewares/validarJWT.js` - valida token en rutas protegidas
- `src/middlewares/checkValidations.js` - validaciones de entrada

## Base de datos
Cadena de conexión en `STRINGDB` (Postgres). El archivo `baseDatos.sql` contiene el esquema inicial.

## Desarrollo y pruebas
- Usa `npm run dev` para desarrollo.
- Pruebas manuales con Postman o Insomnia. Importa colecciones si las tienes.

## Despliegue
- Asegúrate de definir las mismas variables de entorno en el servidor.
- Instalar dependencias y usar `npm start` o un process manager (PM2).

## Contacto y mejoras
Si quieres que añada documentación de endpoints detallada (request/response) o una colección de Postman, dímelo y la preparo.






# API Incidencias – Backend

API REST para la gestión de incidencias técnicas, mantenimiento, máquinas, usuarios, archivos e informes dentro de una organización.

Desarrollada con **Node.js**, **Express** y **PostgreSQL**, utilizando **JWT** para autenticación, **Cloudinary** para almacenamiento de archivos y **PDFKit** para generación de informes.

## 🚀 Estado del proyecto
![En desarrollo](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)

---

## 📋 Tabla de contenidos
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Autenticación y roles](#autenticación-y-roles)
- [Endpoints principales](#endpoints-principales)
- [Subida y gestión de archivos](#subida-y-gestión-de-archivos)
- [Generación de PDFs](#generación-de-pdfs)
- [Base de datos](#base-de-datos)
- [Dependencias](#dependencias)
- [Desarrollo y pruebas](#desarrollo-y-pruebas)
- [Despliegue](#despliegue)

---

## 📝 Descripción
Esta API actúa como backend de una aplicación de gestión de incidencias técnicas. Permite crear, actualizar y resolver incidencias, asignar técnicos y responsables, gestionar máquinas y usuarios, subir archivos asociados, generar informes en PDF y controlar el acceso mediante roles.

## 🛠 Tecnologías
* **Entorno:** Node.js
* **Framework:** Express
* **Base de datos:** PostgreSQL
* **Autenticación:** JSON Web Tokens (JWT)
* **Almacenamiento:** Cloudinary (vía Multer)
* **Informes:** PDFKit

## ⚙️ Requisitos
* Node.js versión 16 o superior
* PostgreSQL
* npm (gestor de paquetes)

## 🔧 Instalación
1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Accede a la carpeta del proyecto:

```bash
cd api-incidencias-backend
```
3. Instala las dependencias:

```bash
npm install
```
## 🔐 Variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

Fragmento de código
```
PORT=3000
STRINGDB=postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD
SECRET_KEY=tu_clave_secreta_jwt
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

## 🚀 Ejecución
Modo desarrollo (con nodemon):

```Bash
npm run dev
```

Modo producción:

```Bash
npm start
```

La API se ejecutará por defecto en: **http://localhost:3000** o en la URL definida en la variable de entorno `BASE_URL`.

## 📂 Estructura del proyecto

Plaintext
```
src
│
├── app.js
├── routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── maquina.routes.js
│   ├── incidencia.routes.js
│   ├── archivo.routes.js
│   └── informe.routes.js
├── controllers
├── models
├── middlewares
├── helpers
├── configs
│   └── cloudinary.js
    └── dbConnect.js
```
## 🔑 Autenticación y roles
La API utiliza autenticación mediante JWT. Las rutas protegidas requieren el header: Authorization: ```Bearer TOKEN```

Roles disponibles:

- Administrador

- Jefe

- Técnico

- Cliente

- Demo

**[!IMPORTANT]** El acceso a cada ruta se controla mediante middlewares que validan el rol del usuario antes de permitir la ejecución.

## 🛣 Endpoints principales
- Autenticación
```
POST /api/auth/login
```
```
POST /api/auth/register
```
- Usuarios
```
GET /api/user - Listar usuarios
```
```
POST /api/user - Crear usuario
```
```
PUT /api/user/:id - Editar usuario
```
```
DELETE /api/user/:id - Eliminar usuario
```
- Máquinas
```
GET /api/maquina
```
```
POST /api/maquina
```
```
PUT /api/maquina/:id
```
- Incidencias
```
GET /api/incidencia
```
```
GET /api/incidencia/:id
```
```
POST /api/incidencia
```
```
PUT /api/incidencia/:id
```
- Archivos
```
POST /api/archivo/:id - Subir archivo a una incidencia
```
```
GET /api/archivo/:id - Listar archivos de una incidencia
```
```
DELETE /api/archivo/:id - Borrar archivo
```
- Informes
```
GET /api/informe/incidencia/:id - Descargar PDF de la incidencia
```
## 📁 Subida y gestión de archivos
- Subida mediante multipart/form-data.

- Compatible con imágenes y documentos PDF.

- Archivos almacenados en Cloudinary.

- Se guarda la URL pública en la base de datos.

- Soporte para definir una "imagen principal" de la incidencia.

## 📄 Generación de PDFs
Los informes de incidencias se generan dinámicamente con PDFKit e incluyen:

- Información detallada de la incidencia.

- Máquina asociada.

- Informes técnicos realizados.

- Listado de archivos adjuntos (enlaces).

- Visualización de la imagen principal.

## 🗄️ Base de datos
El proyecto utiliza PostgreSQL. Se incluye el archivo baseDatos.sql con:

- Esquema completo.

- Relaciones entre tablas (FKs).

- Datos iniciales para pruebas.

- Diagrama de la base de datos:

## 📦 Dependencias
**Principales**
- express: Framework backend.

- pg: Cliente PostgreSQL.

- dotenv: Gestión de variables de entorno.

- cors: Control de acceso CORS.

- bcryptjs: Encriptación de contraseñas.

- jsonwebtoken: Autenticación JWT.

- express-validator: Validación de datos.

- multer: Subida de archivos.

- cloudinary: Almacenamiento en la nube.

- pdfkit: Generación de PDFs.

**Desarrollo**
- nodemon: Reinicio automático del servidor.

## 🧪 Desarrollo y pruebas
- Ejecutar con npm run dev.

- Probar endpoints con Postman o Insomnia.

- Usar cuentas demo incluidas en el script SQL para pruebas funcionales.

## 🚢 Despliegue
1. Configurar las variables de entorno en el servidor de destino.

2. Instalar dependencias con npm install --production.

3. Ejecutar npm start.

**Recomendación: Usar PM2 para mantener el proceso activo en entornos de producción.**


