import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigInterface } from './config.interface';

export interface EnvConfigRaw {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigInterface;

  constructor(filePath: string) {
    filePath = filePath.replace('undefined', '');
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: string): string | number | boolean {
    return this.envConfig[key];
  }

  get env(): string {
    return this.envConfig.NODE_ENV;
  }

  get serverHost(): string {
    return this.envConfig.SERVER_HOST;
  }

  get serverPort(): number {
    return this.envConfig.SERVER_PORT;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get jwtTimeout(): string {
    return this.envConfig.JWT_TIMEOUT;
  }
  private validateInput(envConfig: EnvConfigRaw): ConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().default('development'),

      SERVER_HOST: Joi.string().allow('', null),
      SERVER_PORT: Joi.number().allow('', null),

      JWT_SECRET: Joi.string().required(),
      JWT_TIMEOUT: Joi.string().required(),
    });

    const validationResult = envVarsSchema.validate(envConfig, {
      allowUnknown: true,
    });

    if (validationResult.error !== undefined) {
      throw new Error(
        `Config validation error:  ${validationResult.error.message}`,
      );
    }

    return validationResult.value as ConfigInterface;
  }
}
