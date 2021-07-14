import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AUTH_MODULE_OPTIONS } from './auth.contents';
import { AuthModuleOptions } from './auth.interfaces';
import { AuthService } from './auth.service';
import { CTokenStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule,
    HttpModule.register({
      timeout: 5000
    }),
  ]
})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options
        },
        AuthService,
        CTokenStrategy
      ],
      exports: [AuthService, CTokenStrategy],
    };
  }
}
