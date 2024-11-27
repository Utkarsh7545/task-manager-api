import { Injectable, NestMiddleware, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(
    @Inject('VALIDATION_FUNCTION') private readonly validate: (body: any) => string | null,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (['GET', 'DELETE'].includes(req.method)) {
      return next();
    }

    if (!req.body || typeof req.body !== 'object') {
      throw new BadRequestException('Request body is required and must be an object');
    }

    const errorMessage = this.validate(req.body);
    if (errorMessage) {
      throw new BadRequestException(errorMessage);
    }
    next();
  }
}
