import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../utils/errorHandler';

/**
 *
 * @param router
 */
const handle404Error = (router: Router): void => {
  router.use((): void => {
    ErrorHandler.notFoundError();
  });
};

/**
 *
 * @param router
 */
const handleClientError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    ErrorHandler.clientError(err, res, next);
  });
};

/**
 *
 * @param router
 */
const handleServerError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
