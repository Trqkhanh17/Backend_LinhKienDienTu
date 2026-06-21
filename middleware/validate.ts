import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

type RequestPart = 'body' | 'params' | 'query';
type ValidationSchema = Partial<Record<RequestPart, ZodTypeAny>>;

const formatZodError = (error: ZodError) =>
  error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));

export const validate =
  (schemas: ValidationSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      (Object.keys(schemas) as RequestPart[]).forEach((part) => {
        const schema = schemas[part];

        if (!schema) {
          return;
        }

        (req as any)[part] = schema.parse(req[part]);
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          statusCode: 400,
          errors: formatZodError(error),
        });
      }

      next(error);
    }
  };
