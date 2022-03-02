import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { isArray } from '../utils/is-array';
import { BaseValidator } from './base-validator';

export class ArrayValidator<T extends readonly Validatable<unknown>[]> extends BaseValidator<
    [
        ...{
            [K in keyof T]: ValidatableType<T[K]>;
        }
    ]
> {
    constructor(private readonly validationArray: T) {
        super();
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is [
        ...{
            [K in keyof T]: ValidatableType<T[K]>;
        }
    ] {
        if (!isArray(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not array',
                });
            }
            return false;
        }

        if (subject.length !== this.validationArray.length) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'array length does not match',
                });
            }
            return false;
        }

        return this.validationArray.every((validator, i) => {
            const localDiagnostics: ValidationDiagnostics = {};
            const validationResult = validator.validate(subject[i], localDiagnostics);

            if (!validationResult && diagnostics) {
                Object.assign(diagnostics, {
                    error: `Array at index ${i}: (${localDiagnostics.error ?? 'unknown error'})`,
                });
            }

            return validationResult;
        });
    }
}
