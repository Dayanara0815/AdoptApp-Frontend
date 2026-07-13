# 🐾 AdoptApp

Plataforma web para facilitar la adopción responsable de mascotas, conectando albergues y personas que desean darles un hogar.

---

## ¿Qué es AdoptApp?

AdoptApp permite a los albergues publicar mascotas en adopción y a los usuarios explorar el catálogo, filtrar por características y contactar directamente al publicante vía WhatsApp. El objetivo es agilizar el proceso de adopción y promover el bienestar animal.

---

## Vistas de la aplicación

### Landing Page

Página pública de presentación donde el visitante conoce la plataforma antes de registrarse. Incluye una Hero Section, sección de Quiénes Somos, Misión y Visión, y los Objetivos de AdoptApp.

### Registro y Acceso

Flujo completo de autenticación: registro de usuario con verificación de correo mediante código de 6 dígitos, inicio de sesión y recuperación de contraseña.

### Catálogo de Mascotas

Pantalla principal post-login. Muestra un grid de mascotas disponibles con filtros por especie, edad, tamaño y sexo. Cada mascota tiene una vista de detalle con toda su información y un botón para contactar al publicante directamente por WhatsApp.

### Mis Publicaciones

Dashboard personal donde el usuario gestiona sus publicaciones: puede registrar nuevas mascotas, editar su información, marcarlas como adoptadas o eliminarlas.

### Mi Perfil

Vista del perfil del usuario con foto de avatar, datos personales y opción de editar la información de la cuenta.

---

## Stack tecnológico

- **Frontend:** React
- **Backend:** Spring Boot
- **Base de datos:** PostgreSQL
- **Deploy:** AWS Lightsail

---

## Cómo ejecutar el proyecto

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Un gestor de paquetes como `pnpm` (recomendado) o `npm`
- [Docker](https://www.docker.com/) (opcional, para despliegue en contenedor)

---

### Opción 1: Ejecución Local (Desarrollo)

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd AdoptApp-Frontend
   ```

2. **Configurar las variables de entorno:**
   Crea o edita el archivo [.env](file:///c:/proyectos-u/AdoptApp-Frontend/.env) en la raíz del proyecto. Puedes configurar las siguientes variables de entorno:

   ```env
   VITE_BACKEND_URL=http://localhost:PORT
   VITE_FILE_SERVICE_URL=http://localhost:PORT/files
   VITE_WS_URL=ws://localhost:PORT/ws
   ```

   _Nota: Si dejas los valores vacíos, se usarán los valores por defecto configurados en la aplicación o rutas relativas. (Usados para deploy)._

3. **Instalar dependencias:**
   Usando `pnpm` (recomendado):

   ```bash
   pnpm install
   ```

   O usando `npm`:

   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   Usando `pnpm`:

   ```bash
   pnpm dev
   ```

   O usando `npm`:

   ```bash
   npm run dev
   ```

   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

5. **Construir para producción (opcional):**
   Para compilar la aplicación optimizada:
   ```bash
   pnpm build   # o npm run build
   ```
   Para previsualizar la compilación de producción localmente:
   ```bash
   pnpm preview # o npm run preview
   ```

---

### Opción 2: Ejecución con Docker

El proyecto incluye un [docker-compose.yml](file:///c:/proyectos-u/AdoptApp-Frontend/docker-compose.yml) y un [Dockerfile](file:///c:/proyectos-u/AdoptApp-Frontend/deploy/Dockerfile) configurado para producción.

1. **Crear la red de Docker:**
   Dado que el archivo `docker-compose.yml` utiliza una red externa llamada `ms-net`, debes crearla primero si aún no existe:

   ```bash
   docker network create ms-net
   ```

2. **Configurar variables de entorno:**
   Asegúrate de definir las variables de entorno en tu archivo [.env](file:///c:/proyectos-u/AdoptApp-Frontend/.env) antes de compilar.

3. **Compilar y levantar el contenedor:**

   ```bash
   docker compose up -d --build
   ```

4. **Acceder a la aplicación:**
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Equipo

| Nombre             | Módulo                          |
| ------------------ | ------------------------------- |
| Dayanara Caro      | Landing Page                    |
| Kreisy Valenzuela  | Registro, Acceso y Recuperación |
| Alexis Maza        | Catálogo de Mascotas            |
| Sergio Andre Rupay | Mis Publicaciones               |
| Piero Ferrel       | Mi Perfil                       |
