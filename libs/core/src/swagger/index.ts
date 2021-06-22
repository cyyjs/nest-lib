/*
 * @Author: cyy
 * @Date: 2021-06-22 16:27:56
 * @LastEditors: cyy
 * @LastEditTime: 2021-06-22 16:33:46
 * @Description: api文档配置
 */

import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
export interface SwaggerOptions {
  path: string,
  title?: string
  description?: string
  version?: string
}

export const setupSwagger = (app: INestApplication, opt?:SwaggerOptions) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const options = new DocumentBuilder()
    .setTitle(opt.title)
    .setDescription(opt.description)
    .setVersion(opt.version)
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(opt.path, app, document)
}
