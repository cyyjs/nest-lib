/*
 * @Author: cyy
 * @Date: 2021-06-23 10:48:45
 * @LastEditors: cyy
 * @LastEditTime: 2021-06-23 14:51:48
 * @Description: 自定义token strategy
 */

import { Strategy } from 'passport-strategy'
import { Request } from 'express'

// 配置参数
export interface TokenOptions {
  // 用于验证的header中的token字段名
  tokenField?: string
  // 错误消息
  badRequestMessage?: string
}

type DoneCallback = (err: Error | null, user?: unknown, info?: unknown) => void
export type VerifyFunction = (token: string, done: DoneCallback) => void

export class TokenStrategy extends Strategy {
  public name = 'token'
  private tokenField?: string
  private verify?: VerifyFunction
  private error
  private fail
  private success
  public constructor (options: TokenOptions = {}, verify?:VerifyFunction) {
    super()
    if (typeof options == 'function') {
      this.verify = options;
      options = {};
    }
    if (!this.verify) { throw new TypeError('TokenStrategy requires a verify callback'); }
    
    this.tokenField = options.tokenField || 'authorization'
  }

  public authenticate(req:Request, opt:TokenOptions = {}) {
    
    const token = req.headers[this.tokenField]
    const verifiedCallback: DoneCallback = (err, user, info) => {
      if (err) {
        return this.error(err)
      }
      if (!user) {
        return this.fail(info, 401)
      }

      return this.success(user, info)
    }

    try {
      return this.verify(token, verifiedCallback)
    } catch (e) {
      return this.error(e)
    }
  }
}