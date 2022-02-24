import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class DisjunctiveValidator<V extends Validatable<unknown>[]>
    extends BaseValidator<ValidatableType<V[number]>>
    implements Validatable<ValidatableType<V[number]>> {
    private readonly validators: V;

    constructor(validators: V) {
        super();
        this.validators = validators;
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is ValidatableType<V[number]> {
        const validationSucceeded = this.validators.some(validator => validator.validate(subject));

        // Assign rejection reason
        if (!validationSucceeded && diagnostics) {
            const validationErrors = this.validators
                .map(validator => {
                    const localDiagnostics: ValidationDiagnostics = {};
                    validator.validate(subject, localDiagnostics);
                    return localDiagnostics.error;
                })
                .filter((e): e is string => e !== undefined);

            Object.assign(diagnostics, {
                error: validationErrors.map(e => '(' + e + ')').join(' AND ')
            });
        }

        return validationSucceeded;
    }
}
