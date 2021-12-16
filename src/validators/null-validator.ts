import BaseValidator from './base-validator';

export default class NullValidator extends BaseValidator<null> {
    validate(subject: unknown): subject is null {
        return subject === null;
    }
}
