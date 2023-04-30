import { ParserInterface } from './ParserInterface';
import { ApiName } from './enums';

export interface ParserFactoryInterface {
  create(apiName: ApiName): ParserInterface;
}
