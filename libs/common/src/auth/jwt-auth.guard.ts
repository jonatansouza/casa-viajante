import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, map, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { IUser } from "../dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy ) {

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authorization;
    if(!jwt) {
      return false;
    }
    return this.authClient.send<IUser>('authenticate', {
      Authorization: jwt
    }).pipe(
      tap(res => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true)
    )
  }
}