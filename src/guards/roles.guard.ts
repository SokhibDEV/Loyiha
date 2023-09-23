import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
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

    const hasRole = roles.includes(request.user.role);

    if (!hasRole) {
      throw new ForbiddenException("Kechirasiz siz bu yo'lga kira olmaysiz!");
    }
    return true;
  }
}
