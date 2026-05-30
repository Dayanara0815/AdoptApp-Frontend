# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Declarar variables de entorno de Vite requeridas durante la compilación
ARG VITE_BACKEND_URL
ARG VITE_FILE_SERVICE_URL

# Exponerlas al proceso de compilación de Vite
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_FILE_SERVICE_URL=$VITE_FILE_SERVICE_URL

# Compilar la aplicación React + Vite
RUN npm run build

# Stage 2: Serve
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Limpiar los archivos por defecto de Nginx
RUN rm -rf ./*

# Copiar el build compilado desde la etapa anterior
COPY --from=build /app/dist .

# Copiar la configuración personalizada de Nginx
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto estándar
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
