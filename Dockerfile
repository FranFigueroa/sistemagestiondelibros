# Usar una imagen base de Node.js
FROM node:16

# Crear un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar archivos de proyecto
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 5000 para la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
