import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './routes';

process.on('uncaughtException', (e: Error): void => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', (e: Error): void => {
  console.log(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
// To add more versions:
//applyRoutes(routes, router, 'v2')
applyMiddleware(errorHandlers, router);

const { SERVER_PORT = 3001 } = process.env;
const server = http.createServer(router);

server.listen(SERVER_PORT, (): void =>
  console.log(`Server is running http://localhost:${SERVER_PORT}...`),
);
