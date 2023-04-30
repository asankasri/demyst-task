import { ParserFactoryInterface } from '../ParserFactoryInterface';
import { ParserInterface } from '../ParserInterface';
import { DummyParser } from '../DummyParser';
import { GetBalanceSheetParser } from './parsers/GetBalanceSheetParser';
import { ApiName } from '../enums';

import { XeroParser } from './XeroParser';

export class XeroParserFactory implements ParserFactoryInterface {
  create(apiName: ApiName): ParserInterface {
    if (apiName === ApiName.GetBalanceSheet) {
      return new XeroParser(new GetBalanceSheetParser());
    }

    return new XeroParser(new DummyParser());
  }
}
