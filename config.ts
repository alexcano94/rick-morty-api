import dotenv from "dotenv";

dotenv.config();

interface ENV {
    NODE_ENV: 'development' | 'production' | string;
    PORT: number | undefined;
    JWT_SECRET: string | undefined;
    SALT_ROUNDS: string | undefined;
    DB_URL: string | undefined;
    USERS_COLLECTION_NAME: string | undefined;
    RICK_MORTY_API_URL: string | undefined;
}

interface Config {
    NODE_ENV: 'development' | 'production' | string;
    PORT: number;
    JWT_SECRET: string;
    SALT_ROUNDS: string;
    DB_URL: string;
    USERS_COLLECTION_NAME: string;
    RICK_MORTY_API_URL: string;
}


const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DB_URL: process.env.DB_URL,
    USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    RICK_MORTY_API_URL: process.env.RICK_MORTY_API_URL,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
