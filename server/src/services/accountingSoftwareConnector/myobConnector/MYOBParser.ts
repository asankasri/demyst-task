import { ParserInterface } from '../ParserInterface';

export class MYOBParser implements ParserInterface {
  constructor(private apiParser: ParserInterface) {}

  convertRequest(request: any): any {
    // NOTE: common parsing can be done here (if any)

    return this.apiParser.convertRequest(request);
  }

  convertResponse(response: any): any {
    // NOTE: common parsing can be done here (if any)

    return this.apiParser.convertResponse(response);
  }
}
