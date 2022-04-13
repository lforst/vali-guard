import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { ValidationError } from './validation-error';

export function assert<V extends Validatable<unknown>>(
    validatable: V,
    subject: unknown
): asserts subject is ValidatableType<V> {
    const diagnostics: ValidationDiagnostics = {};
    if (!validatable.validate(subject, diagnostics)) {
        throw new ValidationError(diagnostics.error);
    } else {
        return;
    }
}
