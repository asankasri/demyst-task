import { ParserInterface } from './ParserInterface';

export class DummyParser implements ParserInterface {
  convertRequest(request: any): any {
    // no parsing here
    return request;
  }

  convertResponse(response: any): any {
    // no parsing here
    return response;
  }
}
