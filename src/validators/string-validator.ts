import BaseValidator from './base-validator';

export default class StringValidator extends BaseValidator<string> {
    public validate(subject: unknown): subject is string {
        return typeof subject === 'string';
    }
}
