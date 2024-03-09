import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("LoggingInterceptor")
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const parameters = JSON.stringify({ ...req.body, ...req.query, ...req.params })
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(`Finished ${req.method} ${req.url} ${parameters} in ${Date.now() - now}ms`)
        }),
      );
  }
}
