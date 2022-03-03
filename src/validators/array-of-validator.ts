import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { isArray } from '../utils/is-array';
import { BaseValidator } from './base-validator';

export class ArrayOfValidator<T extends Validatable<unknown>> extends BaseValidator<
    ValidatableType<T>[]
> {
    constructor(private readonly validator: T) {
        super();
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is ValidatableType<T>[] {
        if (!isArray(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not array',
                });
            }
            return false;
        }

        for (let i = 0; i < subject.length; i++) {
            const localDiagnostics: ValidationDiagnostics = {};
            const validationResult = this.validator.validate(subject[i], localDiagnostics);

            if (!validationResult) {
                if (diagnostics) {
                    Object.assign(diagnostics, {
                        error: `Array at index ${i}: (${
                            localDiagnostics.error ?? 'unknown error'
                        })`,
                    });
                }
                return false;
            }
        }

        return true;
    }

    minLength(limit: number): ArrayOfValidator<T> {
        return new MinLengthArrayOfValidator(this, this.validator, limit);
    }

    maxLength(limit: number): ArrayOfValidator<T> {
        return new MaxLengthArrayOfValidator(this, this.validator, limit);
    }
}

class MaxLengthArrayOfValidator<
    T extends Validatable<unknown>,
    V extends ArrayOfValidator<T>
> extends ArrayOfValidator<T> {
    constructor(
        private readonly wrappedArrayOfValidator: V,
        validator: T,
        private readonly limit: number
    ) {
        super(validator);
    }

    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is ValidatableType<V> {
        if (!isArray(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not array',
                });
            }
            return false;
        }

        if (subject.length > this.limit) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: `array length exceeds maximum (${this.limit})`,
                });
            }
            return false;
        }

        return this.wrappedArrayOfValidator.validate(subject, diagnostics);
    }
}

class MinLengthArrayOfValidator<
    T extends Validatable<unknown>,
    V extends ArrayOfValidator<T>
> extends ArrayOfValidator<T> {
    constructor(
        private readonly wrappedArrayOfValidator: V,
        validator: T,
        private readonly limit: number
    ) {
        super(validator);
    }

    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is ValidatableType<V> {
        if (!isArray(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not array',
                });
            }
            return false;
        }

        if (subject.length < this.limit) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: `array length below minimum (${this.limit})`,
                });
            }
            return false;
        }

        return this.wrappedArrayOfValidator.validate(subject, diagnostics);
    }
}
