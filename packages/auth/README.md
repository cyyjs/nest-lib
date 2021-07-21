## nestjs 授权封装

## 安装

```bash
yarn add @cyyjs/nestjs-auth
```

## auth

使用 jwt授权

```ts
import { AuthModule, RolesGuard } from '@cyyjs/nestjs-auth'
@Module({
  imports: [
    AuthModule.register({
      url: '' // 获取用户信息的url
    })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    AppService
  ],
})
export class AppModule {}
```

