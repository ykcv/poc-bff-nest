import 'dotenv/config';

export function getEnv(): string[] {
  switch (process.env.NODE_ENV) {
    case 'local':
      return ['.env.local', '.env'];
    case 'development':
      return ['.env.development', '.env'];
    case 'test':
      return ['test/.env-test', '.env.example'];
    case 'production':
    default:
      return ['.env'];
  }
}
