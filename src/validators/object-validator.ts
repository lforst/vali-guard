import { Validatable, ValidatableType, ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export interface ObjectValidatorOptions {
    allowUnknown: boolean;
}

const defaultOptions: ObjectValidatorOptions = {
    allowUnknown: false
};

export class ObjectValidator<V extends Record<string, Validatable<unknown>>> extends BaseValidator<
    { [P in keyof V]: ValidatableType<V[P]> }
> {
    protected readonly options: ObjectValidatorOptions;

    constructor(
        protected readonly validationRecord: V,
        options: Partial<ObjectValidatorOptions> = {}
    ) {
        super();
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is {
        [P in keyof V]: ValidatableType<V[P]>;
    } {
        if (!isObject(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not object'
                });
            }
            return false;
        }

        if (!this.options.allowUnknown) {
            const validatorKeySet = new Set(Object.keys(this.validationRecord));
            const hasUnknownField = Object.keys(subject).find(
                subjectKey => !validatorKeySet.has(subjectKey)
            );

            if (hasUnknownField) {
                if (diagnostics) {
                    Object.assign(diagnostics, {
                        error: `superfluous field "${hasUnknownField}" on object`
                    });
                }
                return false;
            }
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

function isObject(subject: unknown): subject is object {
    return typeof subject === 'object' && subject !== null && !Array.isArray(subject);
}
