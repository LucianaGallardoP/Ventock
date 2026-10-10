# Ventock — Frontend

Gestor de ventas y stock: aplicación web para administrar inventario, categorías, usuarios y ventas, con roles diferenciados (SuperAdmin, Admin, Vendedor).

## Stack

- React 19 + Vite
- React Router
- React-Bootstrap
- EmailJS (formulario de contacto)

## Requisitos

- Node.js 18+
- El [backend de Ventock](https://github.com/LucianaGallardoP/Ventock-BackEnd) corriendo (local o desplegado)

## Setup

1. Cloná el repositorio e instalá las dependencias:

   git clone <url-del-repo>
   npm install

2. Creá un archivo `.env` en la raíz del proyecto con las variables de entorno.

3. Levantá el servidor de desarrollo:

   npm run dev

   La app queda disponible en `http://localhost:5173`.

4. Asegurate de tener el [backend](https://github.com/LucianaGallardoP/Ventock-BackEnd) corriendo (local o desplegado) y que `VITE_API_URL` apunte a esa URL — sin esto, el login y el resto de las pantallas no van a poder traer datos.

### Build de producción

npm run build    # genera la carpeta dist/
npm run preview  # sirve ese build localmente, para probarlo antes de deployar

## Variables de entorno

Crear un archivo `.env` en la raíz con estas cuatro variables:

| Variable                   | Descripción                                                                             Ejemplo                      
| `VITE_API_URL`             | URL base del backend (sin `/api` al final)                                             |`http://localhost:3001`              
| `VITE_EMAILJS_SERVICE_ID`  | Service ID de [EmailJS](https://www.emailjs.com/), usado por el formulario de contacto | `service_xxxxxxx`     
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID de EmailJS para el mail de contacto                                        | `template_xxxxxxx`                   
| `VITE_EMAILJS_PUBLIC_KEY`  | Public key de la cuenta de EmailJS                                                     |`xxxxxxxxxxxxxxxxxxx`                

Si falta `VITE_API_URL`, ninguna pantalla va a poder cargar datos (login, inventario, usuarios, etc.). Si faltan las variables de `VITE_EMAILJS_*`, el formulario de `/contact` va a fallar siempre al enviar.

## API — endpoints utilizados

El frontend consume la API del backend a través de los helpers en `src/helpers/`. Esta es la lista de endpoints que usa:

Autenticación — `src/helpers/apiLogin.js`

| Método | Endpoint          | Descripción         
| `POST` | `/api/auth/login` | Inicia sesión, devuelve el token JWT y los datos del usuario 

Usuarios — `src/helpers/apiUsuarios.js`

| Método   | Endpoint             | Descripción                         
| `GET`    | `/api/usuarios`       | Lista usuarios (paginado)              
| `POST`   | `/api/usuarios`       | Crea un usuario nuevo                  
| `PUT`    | `/api/usuarios/:id`   | Actualiza un usuario                   
| `DELETE` | `/api/usuarios/:id`   | Elimina un usuario                     

Categorías — `src/helpers/apiCategoria.js`

| Método   | Endpoint                | Descripción                                               
| `GET`    | `/api/categorias`         | Lista categorías activas (o todas, con `?todas=true`)        
| `POST`   | `/api/categorias`         | Crea una categoría                                            
| `PUT`    | `/api/categorias/:id`     | Actualiza el nombre de una categoría                          
| `PATCH`  | `/api/categorias/:id`     | Activa/desactiva una categoría                                 
| `DELETE` | `/api/categorias/:id`     | Elimina una categoría                                          

Productos — `src/helpers/apiProducto.js`

| Método   | Endpoint               | Descripción                 
| `GET`    | `/api/productos`         | Lista productos (paginado)      
| `POST`   | `/api/productos`         | Crea un producto                
| `PUT`    | `/api/productos/:id`     | Actualiza un producto (también se usa para descontar stock al cerrar una venta)
| `DELETE` | `/api/productos/:id`     | Elimina un producto             

Todas las rutas protegidas esperan el token JWT en el header `x-token`, que se toma de `localStorage` (guardado ahí tras el login).

## Roles

- **SuperAdmin**: gestión de usuarios.
- **Admin**: inventario (alta/edición/baja), categorías, ventas, presupuestos.
- **Vendedor**: inventario (solo consulta y venta), presupuestos.

## Deploy

Desplegado en Vercel. Al configurar el proyecto ahí, hay que cargar las mismas variables `VITE` del `.env`.
