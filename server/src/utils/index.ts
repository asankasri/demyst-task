import express, { Router, Request, Response, NextFunction } from 'express';

export const enum Methods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
  PATCH = 'patch',
  OPTION = 'option',
}

type Wrapper = (router: Router) => void;
type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

interface VersionHandler {
  v1: Handler | Handler[];
  // To add more versions:
  // v2?: Handler | Handler[];
}

export interface Route {
  path: string;
  method: Methods;
  handler: VersionHandler;
  middleware?: Handler;
}

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router): void => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

export const applyRoutes = (routes: Route[], router: Router, version = 'v1'): void => {
  const dummyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next();
  };
  for (const route of routes) {
    const { method, path, handler, middleware } = route;
    if ((handler as any)[version]) {
      (router as any)[method](`/${version}` + path, middleware || dummyMiddleware, (handler as any)[version]);
    } else {
      console.warn(`${path} not available in api ${version}`);
    }
  }
};
