import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ConflictError } from '../types/ConflictError';

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof ConflictError) {
          throw new ConflictException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}
