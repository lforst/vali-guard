import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';

export abstract class BaseValidator<T> implements Validatable<T> {
    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    optional() {
        return new OptionalValidator(this);
    }

    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    nullable() {
        return new NullableValidator(this);
    }

    abstract validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is T;
}

class OptionalValidator<T extends Validatable<unknown>> extends BaseValidator<
    ValidatableType<T> | undefined
> {
    constructor(private readonly wrappedValidator: T) {
        super();
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is ValidatableType<T> | undefined {
        const localDiagnostics: ValidationDiagnostics = {};

        const validationSucceeded = this.wrappedValidator.validate(
            subject,
            diagnostics ? localDiagnostics : undefined
        );

        if (!validationSucceeded && subject !== undefined) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: `${localDiagnostics.error ?? 'unknown error'} AND not undefined`,
                });
            }
            return false;
        }

        return true;
    }
}

class NullableValidator<
    T extends Validatable<unknown>
> extends BaseValidator<ValidatableType<T> | null> {
    constructor(private readonly wrappedValidator: T) {
        super();
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is ValidatableType<T> | null {
        const localDiagnostics: ValidationDiagnostics = {};

        const validationSucceeded = this.wrappedValidator.validate(
            subject,
            diagnostics ? localDiagnostics : undefined
        );

        if (!validationSucceeded && subject !== null) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: `${localDiagnostics.error ?? 'unknown error'} AND not null`,
                });
            }
            return false;
        }

        return true;
    }
}
