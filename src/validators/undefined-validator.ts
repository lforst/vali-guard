import BaseValidator from './base-validator';

export default class UndefinedValidator extends BaseValidator<undefined> {
    validate(subject: unknown): subject is undefined {
        return typeof subject === 'undefined';
    }
}
