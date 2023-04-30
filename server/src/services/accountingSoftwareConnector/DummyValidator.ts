import { ValidatorInterface } from './ValidatorInterface';

export class DummyValidator implements ValidatorInterface {
  validate(request: any): boolean {
    // no validation here
    return !!request;
  }
}
