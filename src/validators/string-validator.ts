import { BaseValidator } from './base-validator';

export class StringValidator extends BaseValidator<string> {
    validate(subject: unknown): subject is string {
        return typeof subject === 'string';
    }
}
