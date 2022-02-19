import { BaseValidator } from './base-validator';

export class UndefinedValidator extends BaseValidator<undefined> {
    validate(subject: unknown): subject is undefined {
        return typeof subject === 'undefined';
    }
}
