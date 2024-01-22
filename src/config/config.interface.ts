export interface ConfigInterface {
  [key: string]: string | number | boolean;

  NODE_ENV: string;
  SERVER_HOST: string;
  SERVER_PORT: number;

  JWT_SECRET: string;
  JWT_TIMEOUT: string;
}
