import { BaseValidator } from './base-validator';

export class NumberValidator extends BaseValidator<number> {
    validate(subject: unknown): subject is number {
        return typeof subject === 'number';
    }
}
