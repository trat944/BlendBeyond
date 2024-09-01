interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly JWT_SECRET: string;
  readonly NODE_ENV: string;
  readonly CLOUD_NAME: string;
  readonly API_KEY: string;
  readonly API_SECRET: string;
  readonly FRONTEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}