import dotenv from 'dotenv';

type TConfig = {
    [key:string]: EnvironmentConfig
}

type EnvironmentConfig = {
    app: AppConfig
    cloudinary: CloudinaryConfig
}

type AppConfig = {
    PORT: string | number
}

type CloudinaryConfig = {
    CLOUD_NAME: string 
    API_KEY: string 
    API_SECRET: string 
}

type DbConfig = {
    URI: string
}

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
  } else {
    dotenv.config({ path: '.env.development' });
  }

const ENV = process.env.NODE_ENV ?? "development";

const CONFIG: TConfig = {
    development:{
        app:{
            PORT: process.env.PORT || 4000
        },
        cloudinary:{
            CLOUD_NAME: process.env.CLOUD_NAME || 'error',
            API_KEY: process.env.API_KEY || 'error',
            API_SECRET: process.env.API_SECRET || 'error'
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 8080
        },
        cloudinary:{
            CLOUD_NAME: process.env.CLOUD_NAME || 'error',
            API_KEY: process.env.API_KEY || 'error',
            API_SECRET: process.env.API_SECRET || 'error'
        }
    }   
}

export default CONFIG[ENV]
