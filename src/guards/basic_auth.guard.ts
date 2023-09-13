import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  
  @Injectable()
  export class BasicAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authorizationHeader = request.headers['authorization'];
  
      if (!authorizationHeader) {
        throw new UnauthorizedException('Authorization header is missing.');
      }
  
      const [type, credentials] = authorizationHeader.split(' ');
  
      if (type.toLowerCase() !== 'basic' || !credentials) {
        throw new UnauthorizedException('Invalid authorization header format.');
      }
  
      const [username, password] = Buffer.from(credentials, 'base64')
        .toString()
        .split(':');
  
      const expectedUsername = process.env.BASIC_AUTH_USERNAME || 'admin';
      const expectedPassword = process.env.BASIC_AUTH_PASSWORD || 'b5s1c+4uth';
  
      if (username !== expectedUsername || password !== expectedPassword) {
        throw new UnauthorizedException('Invalid credentials.');
      }
  
      return true;
    }
  }