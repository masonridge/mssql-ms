import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from './services';

export class JwtRPCAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    if (!authentication) {
      throw new UnauthorizedException('NOT available');
    }
    return this.authClient
      .send('validate_user', { Authentication: authentication })
      .pipe(
        tap((user) => {
          this.addUser(user, context);
        }),
        catchError(() => {
          console.log('NDNDNDNDNFDEDS');

          throw new UnauthorizedException();
        }),
      );
  }

  private addUser(user: any, ctx: ExecutionContext) {
    if (ctx.getType() === 'rpc') {
      ctx.switchToRpc().getData().user = user;
    } else if (ctx.getType() === 'http') {
      ctx.switchToHttp().getRequest().user = user;
    }
  }
  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    }
    if (!authentication) {
      throw new UnauthorizedException('No auth value was provided');
    }

    return authentication;
  }
}
