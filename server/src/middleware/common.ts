import { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';

/**
 *
 * @param router
 */
export const handleHelmet = (router: Router): void => {
  router.use(helmet());
};

/**
 *
 * @param router
 */
export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

/**
 *
 * @param router
 */
export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.urlencoded({ limit: '8mb', extended: true }));
  router.use(parser.json({ limit: '8mb' }));
};

/**
 *
 * @param router
 */
export const handleCompression = (router: Router): void => {
  router.use(compression());
};
