import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AUTH_MODULE_OPTIONS } from './auth.contents';
import { AuthModuleOptions } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_MODULE_OPTIONS)
    private readonly options: AuthModuleOptions,
    private httpService: HttpService
  ) {}

  async getUserByToken(token: string) {
    try {
      const res = await this.httpService[this.options.method || 'get'](this.options.url, {
        headers: {
          [this.options.tokenKey || 'Authorization']: token || ''
        }
      }).toPromise()

      const { code, data, message } = res.data

      if (code && message) {
        throw new UnauthorizedException(message)
      }
      
      return data
    } catch (error: any) {
      const res = error?.response ?? {}
      const msg = res.data?.message || res.message
      
      throw new UnauthorizedException( `auth server error: ${msg}`)
    }
  }
}
