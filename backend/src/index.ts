import config from "./config/config";
import prisma from "./db/client";
import { server } from "./server";
// import { server } from "./sockets/socket";


const PORT = process.env.PORT || 4000;

async function main() {
    try {
      await prisma.$connect();
      console.log('Connected to the database');
      
      // Aquí puedes iniciar tu servidor Express y cualquier otra lógica de la aplicación
      server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} and is connected to the database`);
      });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1); // Salir del proceso si hay un error de conexión
    }
  }
  
  main()
    .catch(error => {
      console.error('Error during application startup:', error);
      process.exit(1); // Salir del proceso si hay un error durante el inicio de la aplicación
    });
