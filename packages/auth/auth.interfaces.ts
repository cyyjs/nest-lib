/*
 * @Author: cyy
 * @Date: 2021-06-23 10:48:45
 * @LastEditors: cyy
 * @LastEditTime: 2021-06-23 10:55:03
 * @Description: 授权相关接口
 */

export type AuthModuleOptions = {
  // 授权的接口地址
  url: string

  // 请求方式, default： get
  method?: string

  // 请求header中的key, default：Authorization
  tokenKey?: string
}
