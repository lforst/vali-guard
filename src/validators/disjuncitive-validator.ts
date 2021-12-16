import { IValidator } from '../types';
import BaseValidator from './base-validator';

export default class DisjunctiveValidator<T> extends BaseValidator<T> {
    constructor(readonly validators: IValidator<unknown>[]) {
        super();
    }

    validate(subject: unknown): subject is T {
        return this.validators.some(validator => validator.validate(subject));
    }
}
