import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

/**
 * 授权守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      let token = request.headers['authorization'];
      token = token.replace('Bearer ', '');
      const { id } = this.jwt.verify(token);
      const uid = request.body.uid || request.query.uid
      if (uid != id) throw new UnauthorizedException('非法操作');
      // 将授权id设置到request中
      context.switchToHttp().getRequest().auth_user = id;
    } catch (err) {
      if (err.message === '非法操作') throw err;
      throw new UnauthorizedException('未授权');
    }
    return true;
  }
}
