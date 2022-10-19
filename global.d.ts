declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        JWT_SECRET?: string,
        SALT_ROUNDS?: string,
        DB_URL?: string;
        USERS_COLLECTION_NAME?: string;
        RICK_MORTY_API_URL: string;
    }
  }