import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class ObjectValidator<
    V extends {
        [key: string]: Validatable<unknown>;
        [key: number]: Validatable<unknown>;
    }
> extends BaseValidator<{ [P in keyof V]: ValidatableType<V[P]> }> {
    constructor(private readonly validationRecord: V) {
        super();
    }

    // Do not wrap the guard type into its own type! - it messes with how the TS language server displays the return types
    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is { [P in keyof V]: ValidatableType<V[P]> } {
        const isObject = typeof subject === 'object' && subject !== null && !Array.isArray(subject);

        if (!isObject) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not object'
                });
            }
            return false;
        }

        return Object.entries(this.validationRecord).every(([key, validator]) => {
            const localDiagnostics: ValidationDiagnostics = {};
            const validationResult = validator.validate(
                (subject as Record<string, unknown>)[key],
                localDiagnostics
            );

            if (!validationResult && diagnostics) {
                Object.assign(diagnostics, {
                    error: `Object field "${key}": (${localDiagnostics.error ?? 'unknown error'})`
                });
            }

            return validationResult;
        });
    }
}
