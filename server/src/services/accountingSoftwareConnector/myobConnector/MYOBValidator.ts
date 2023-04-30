import { ValidatorInterface } from '../ValidatorInterface';

export class MYOBValidator implements ValidatorInterface {
  constructor(private apiValidator: ValidatorInterface) {}

  validate(request: any) {
    // NOTE: common validations can be done here (if any)

    return this.apiValidator.validate(request);
  }
}
