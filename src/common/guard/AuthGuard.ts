import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard  implements  CanActivate{
  constructor(private  readonly  jwt:JwtService) {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const  request = context.switchToHttp().getRequest()
    try {
      let token = request.headers["authorization"]
      token = token.replace('Bearer ','')
      const {id} = this.jwt.verify(token)
      context.switchToHttp().getRequest().auth_user = id
    }catch (err){
      throw new UnauthorizedException('未授权')
    }
    return true
  }

}