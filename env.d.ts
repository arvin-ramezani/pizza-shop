namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    MONGODB_USERNAME: string;
    MONGODB_PASSWORD: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: string;
    NEXT_PUBLIC_PRODUCTION_DOMAIN: string;
  }
}
