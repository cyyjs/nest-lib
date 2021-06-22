import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
      return {
        code: 0,
        message: '',
        data
      }
    }));
  }
}


// 超时拦截
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  time:number
  constructor(time:number = 5000) {
    this.time = time
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.time),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return new RequestTimeoutException();
        }
        return err;
      }),
    );
  };
};