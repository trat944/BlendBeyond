"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./db/client"));
const server_1 = require("./server");
// import { server } from "./sockets/socket";
const PORT = process.env.PORT || 4000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.$connect();
            console.log('Connected to the database');
            // Aquí puedes iniciar tu servidor Express y cualquier otra lógica de la aplicación
            server_1.server.listen(PORT, () => {
                console.log(`Server is running on port ${PORT} and is connected to the database`);
            });
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1); // Salir del proceso si hay un error de conexión
        }
    });
}
main()
    .catch(error => {
    console.error('Error during application startup:', error);
    process.exit(1); // Salir del proceso si hay un error durante el inicio de la aplicación
});
