import { ValidatorInterface } from '../../ValidatorInterface';
import isValidDate from '../../../../utils/isValidDate';

export class GetBalanceSheetValidator implements ValidatorInterface {
  validate(request: any): boolean {
    const { fromDate, toDate } = request;

    if (fromDate && !isValidDate(fromDate)) {
      throw new Error('Invalid fromDate value');
    }

    if (toDate && !isValidDate(toDate)) {
      throw new Error('Invalid toDate value');
    }

    return true;
  }
}
