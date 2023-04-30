import { ConnectorInterface } from './ConnectorInterface';
import { ParserFactoryInterface } from './ParserFactoryInterface';
import { ValidatorFactoryInterface } from './ValidatorFactoryInterface';
import { ParserInterface } from './ParserInterface';
import { ValidatorInterface } from './ValidatorInterface';
import { ApiName } from './enums';
import { GetBalanceSheetRequest, GetBalanceSheetResponse, ErrorWithMessage } from './types';
import simulatedBalanceSheet from './__simulation_data__/balanceSheet';

export class Connector implements ConnectorInterface {
  constructor(
    private api: ConnectorInterface,
    private parserFactory: ParserFactoryInterface,
    private validatorFactory: ValidatorFactoryInterface,
    private simulation: boolean = false,
  ) {}

  getApi(): ConnectorInterface {
    return this.api;
  }

  getParserFactory(): ParserFactoryInterface {
    return this.parserFactory;
  }

  getValidatorFactory(): ValidatorFactoryInterface {
    return this.validatorFactory;
  }

  getSimulation(): boolean {
    return this.simulation;
  }

  public async getBalanceSheet(req: GetBalanceSheetRequest): Promise<GetBalanceSheetResponse> {
    const apiName = ApiName.GetBalanceSheet;
    const validator: ValidatorInterface = this.validatorFactory.create(apiName);
    const parser: ParserInterface = this.parserFactory.create(apiName);

    try {
      validator.validate(req);
    } catch (err) {
      this.throwValidationError((err as ErrorWithMessage).message);
    }

    if (this.simulation) {
      return simulatedBalanceSheet;
    }

    const request = parser.convertRequest(req);
    const response = await this.api[apiName](request);

    return parser.convertResponse(response) as GetBalanceSheetResponse;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  throwValidationError(message: string) {
    const err = {
      response: {
        data: {
          error: { statusCode: 400, name: 'ValidationError', message },
        },
      },
    };
    throw err;
  }
}
