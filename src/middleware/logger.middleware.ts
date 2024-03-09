import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("LoggerMiddleware")
  use(req: Request, res: Response, next: NextFunction) {
    const parameters = JSON.stringify({ ...req.body, ...req.query, ...req.params })
    this.logger.log(`Started ${req.method} ${req.url} ${parameters}`)
    next();
  }
}
