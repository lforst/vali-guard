import { BaseValidator } from '../../../src/validators/base-validator';
/**
 * Represents a validator that was wrongly implemented, by not setting a diagnostic when the validation fails.
 */
export class NonDiagnosingValidator<T> extends BaseValidator<T> {
    validate(subject: unknown): subject is T {
        return false;
    }
}
