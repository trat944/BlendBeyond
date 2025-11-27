"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: '.env.production' });
}
else {
    dotenv_1.default.config({ path: '.env.development' });
}
const ENV = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
const CONFIG = {
    development: {
        app: {
            PORT: process.env.PORT || 4000
        },
        cloudinary: {
            CLOUD_NAME: process.env.CLOUD_NAME || 'error',
            API_KEY: process.env.API_KEY || 'error',
            API_SECRET: process.env.API_SECRET || 'error'
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 8080
        },
        cloudinary: {
            CLOUD_NAME: process.env.CLOUD_NAME || 'error',
            API_KEY: process.env.API_KEY || 'error',
            API_SECRET: process.env.API_SECRET || 'error'
        }
    }
};
exports.default = CONFIG[ENV];
