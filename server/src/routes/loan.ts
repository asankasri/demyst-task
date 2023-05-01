import { Request, Response } from 'express';

import { Route, Methods } from '../utils';
import { getBalanceSheet } from '../controllers/loan';
import { accountingSoftwares } from '../constants';
import { ErrorWithMessage } from '../services/accountingSoftwareConnector/types';

export default [
  {
    path: '/getBalanceSheet',
    method: Methods.GET,
    handler: {
      v1: [
        async (req: Request, res: Response): Promise<void> => {
          try {
            const { body: { businessDetails, loanAmount, accountingProvider } = {} } = req;

            if (!accountingProvider) {
              throw new Error('Empty accounting provider');
            }

            if (!Object.keys(accountingSoftwares).includes(accountingProvider)) {
              throw new Error('Invalid accounting provider');
            }

            if (!loanAmount) {
              throw new Error('Empty loan amount');
            }

            if (isNaN(loanAmount)) {
              throw new Error('Non-integer loan amount');
            }

            const result = await getBalanceSheet({
              businessDetails,
              loanAmount: Number(loanAmount),
              accountingProvider,
            });

            res.status(200).json(result);
          } catch (e) {
            console.log({ e });
            res.status(500).json({ message: (e as ErrorWithMessage).message });
          }
        },
      ],
    },
  },
] as Route[];
