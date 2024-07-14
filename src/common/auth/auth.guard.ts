import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  environment: string;
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    this.environment = this.configService.get<string>('NODE_ENV');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { environment, exp, email, name } = this.jwtService.decode(token);
      //Validation expiration
      if (Date.now() > exp * 1000) {
        throw new UnauthorizedException();
      }

      //Validation environment
      if (this.environment != environment) {
        throw new UnauthorizedException();
      }

      request['name'] = name;
      request['email'] = email;
      //TODO: Add roles or permissions 
      request['roles'] = []
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
