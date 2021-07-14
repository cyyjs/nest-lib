## nestjs 封装库

### 封装内容

- [x] 异常过滤器
- [x] 返回拦截器、超时拦截器
- [x] swagger文档
- [x] 全局验证管道
- [x] auth授权

## 安装

```bash
yarn add @cyyjs/nestjs
```

## 使用

```ts
// main.ts

import { AppModule } from './app.module';
import { CNestFactory } from '@cyyjs/nestjs'

async function bootstrap() {
  const app = await CNestFactory.create(AppModule, {
    applicationOptions: {}, // NestApplicationOptions
    validationPipeOptions: {}, // ValidationPipeOptions
    swaggerOptions: {
      path: '/swagger',
      title: 'API'
      description: 'API'
      version: '1.0.0'
    },
    filters: {
      exception: true
    },
    interceptors: {
      result: true,
      timeout: {
        time: 5000
      }
    }
  });
  await app.listen(3000);
  console.log(`app start at http://localhost:${3000}`)
}
bootstrap();
```

`CNestFactory.create`的默认配置：

```json
{
  filters: {
    exception: true
  },
  interceptors: {
    result: true,
    timeout: {
      time: 5000
    }
  }
}
```

## auth

使用 jwt授权

```ts
import { AuthModule, RolesGuard } from '@cyyjs/nestjs/auth'
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

