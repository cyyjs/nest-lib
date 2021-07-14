import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'
import { TokenStrategy } from './token.strategy';
import { AUTH_TOKEN_STRATEGY } from './auth.contents';

@Injectable()
export class CTokenStrategy extends PassportStrategy(TokenStrategy, AUTH_TOKEN_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    // 查询返回用户信息
    const user = await this.authService.getUserByToken(token)
    if (!user || user.state) {
      throw new UnauthorizedException('用户授权失败')
    }
    return user
  }
}
