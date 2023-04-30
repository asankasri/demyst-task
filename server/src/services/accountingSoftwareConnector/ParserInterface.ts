export interface ParserInterface {
  convertRequest(request: any): any;
  convertResponse(response: any): any;
}
