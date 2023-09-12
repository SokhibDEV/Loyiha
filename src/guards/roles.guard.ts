import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    // get the roles required
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    let arr = request.rawHeaders;
    let text = null;
    arr.forEach((item) => {
      if (item.includes('Bearer')) {
        text = item;
        return text;
      }
    });
    const token = text.replace('Bearer', '').trim();

    const { user } = this.jwtService.verify(token);

    const hasRole = roles[0] === user.role;

    if (!hasRole) {
      throw new ForbiddenException("Kechirasiz siz bu yo'lga kira olmaysiz!");
    }
    return true;
  }
}
