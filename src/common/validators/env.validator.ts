/* Extra */
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Local = 'local',
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

interface IEnvironment {
  NODE_ENV: string;
  APP_NAME: string;
  APP_DESCRIPTION: string;
  API_VERSION: string;
  HOST: string;
  PORT: number;
  PATH_PREFIX: string;
}

class EnvironmentVariables implements IEnvironment {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  APP_NAME: string;

  @IsString()
  APP_DESCRIPTION: string;

  @IsString()
  API_VERSION: string;

  @IsString()
  HOST: string;

  @IsString()
  PATH_PREFIX: string;
}

export function EnvValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
