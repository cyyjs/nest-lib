import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_TOKEN_STRATEGY } from './auth.contents';

@Injectable()
export class RolesGuard extends AuthGuard(AUTH_TOKEN_STRATEGY) {
  constructor(private reflector: Reflector){
    super();
  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const roles = this.reflector.get('roles', context.getHandler())
    // 允许匿名访问
    if (roles && 'ANONYMOUS' === roles[0]) {
      return true
    }
    // 验证权限，注入user
    await super.canActivate(context)
    const req = context.switchToHttp().getRequest()
    
    return !!req.user
  }

  handleRequest(err, user) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException('授权失败，请重新登录');
    }
    return user;
  }
}