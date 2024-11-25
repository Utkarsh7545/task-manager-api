import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidateMiddleware implements NestMiddleware {
  constructor(private readonly schema: ObjectSchema) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { error } = this.schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }
}
