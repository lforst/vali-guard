import BaseValidator from './base-validator';

export default class NumberValidator extends BaseValidator<number> {
    public validate(subject: unknown): subject is number {
        return typeof subject === 'number';
    }
}
