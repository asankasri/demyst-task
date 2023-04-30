import { ParserFactoryInterface } from '../ParserFactoryInterface';
import { ParserInterface } from '../ParserInterface';
import { DummyParser } from '../DummyParser';
import { GetBalanceSheetParser } from './parsers/GetBalanceSheetParser';
import { ApiName } from '../enums';

import { MYOBParser } from './MYOBParser';

export class MYOBParserFactory implements ParserFactoryInterface {
  create(apiName: ApiName): ParserInterface {
    if (apiName === ApiName.GetBalanceSheet) {
      return new MYOBParser(new GetBalanceSheetParser());
    }

    return new MYOBParser(new DummyParser());
  }
}
