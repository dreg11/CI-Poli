# Dockerfile para frontend React (modo desarrollo)
FROM node:18

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto del servidor de desarrollo
EXPOSE 3000

# Ejecutar la app en modo desarrollo
CMD ["npm", "start"]
