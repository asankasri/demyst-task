export abstract class HTTPClientError extends Error {
  public readonly statusCode!: number;
  public readonly name!: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected constructor(message: object | string) {
    if (typeof message === 'object') {
      super(JSON.stringify(message));
    } else {
      super(message);
    }

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTP400Error extends HTTPClientError {
  public readonly statusCode = 400;

  // eslint-disable-next-line @typescript-eslint/ban-types
  public constructor(message: string | object = 'Bad Request') {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  public readonly statusCode = 404;

  // eslint-disable-next-line @typescript-eslint/ban-types
  public constructor(message: string | object = 'Not found') {
    super(message);
  }
}
