import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { isArray } from '../utils/is-array';
import { BaseValidator } from './base-validator';

export interface ArrayOfValidatorOptions {
    maxLength: number;
    minLength: number;
}

const defaultOptions: ArrayOfValidatorOptions = {
    maxLength: Infinity,
    minLength: -Infinity
};

export class ArrayOfValidator<T extends Validatable<unknown>> extends BaseValidator<
    ValidatableType<T>[]
> {
    private readonly options: ArrayOfValidatorOptions;

    constructor(private readonly validator: T, options: Partial<ArrayOfValidatorOptions> = {}) {
        super();
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is ValidatableType<T>[] {
        if (!isArray(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not array'
                });
            }
            return false;
        }

        if (subject.length > this.options.maxLength) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: `array length exceeds maximum (${this.options.maxLength})`
                });
            }
            return false;
        }

        if (subject.length < this.options.minLength) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: `array length below minimum (${this.options.minLength})`
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
                        error: `Array at index ${i}: (${localDiagnostics.error ?? 'unknown error'})`
                    });
                }
                return false;
            }
        }

        return true;
    }

    maxLength(limit: number) {
        return new ArrayOfValidator(this.validator, {
            minLength: this.options.minLength,
            maxLength: Math.min(limit, this.options.maxLength)
        });
    }

    minLength(limit: number) {
        return new ArrayOfValidator(this.validator, {
            minLength: Math.max(limit, this.options.minLength),
            maxLength: this.options.maxLength
        });
    }
}
