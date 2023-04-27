import { Request, Response } from 'express';
import { Route, Methods } from '../utils';

export default [
  {
    path: '/healthcheck',
    method: Methods.GET,
    handler: {
      v1: [
        async (req: Request, res: Response): Promise<void> => {
          res.status(200).send('healthy');
        },
      ],
      // To add more versions:
      // v2: [
      //   async (req: Request, res: Response): Promise<void> => {
      //     res.status(200).send('healthy2');
      //   },
      // ],
    },
  },
] as Route[];
