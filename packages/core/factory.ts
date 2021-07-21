/*
 * @Author: cyy
 * @Date: 2021-06-22 16:01:25
 * @LastEditors: cyy
 * @LastEditTime: 2021-07-14 18:46:54
 * @Description: app创建封装
 */
import { NestFactory } from '@nestjs/core';
import { INestApplication, NestApplicationOptions, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { setupSwagger, SwaggerOptions } from './swagger'
import { HttpExceptionFilter } from './filter/exception.filter';
import { TimeoutInterceptor, TransformInterceptor } from './interceptor/result.interceptor';

export interface ApplicationOptions {
  applicationOptions?: NestApplicationOptions
  validationPipeOptions?: ValidationPipeOptions
  swaggerOptions?: SwaggerOptions,
  filters?: {
    exception?: boolean
  },
  interceptors?: {
    result?: boolean,
    timeout?: {
      time?: number
    }
  }
}

export class CNestFactoryStatic {
  public async create<T extends INestApplication = INestApplication>(
    module: any,
    options: ApplicationOptions = {
      filters: {
        exception: true
      },
      interceptors: {
        result: true,
        timeout: {
          time: 5000
        }
      }
    },
  ): Promise<T> {
    const app =await NestFactory.create<T>(module, options?.applicationOptions)
     // 全局校验管道配置
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        ...options?.validationPipeOptions
      })
    )
    
    if (options?.swaggerOptions) {
      setupSwagger(app, options?.swaggerOptions)
    }

    // 全局异常过滤器
    const filters = []
    if (options?.filters?.exception) {
      filters.push(new HttpExceptionFilter())
    }
    app.useGlobalFilters(...filters);

    // 全局拦截器
    const interceptors = []
    if (options?.interceptors?.result) {
      interceptors.push(new TransformInterceptor())
    }
    if (options?.interceptors?.timeout) {
      interceptors.push(new TimeoutInterceptor(options?.interceptors?.timeout?.time))
    }
    app.useGlobalInterceptors(...interceptors);
  
    return app
  }
}

export const CNestFactory = new CNestFactoryStatic()
