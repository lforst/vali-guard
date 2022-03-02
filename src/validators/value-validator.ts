import { Primitive, ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class ValueValidator<T extends [Primitive, ...Primitive[]]> extends BaseValidator<
    T[number]
> {
    constructor(private readonly values: T) {
        super();
    }

    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is T[number] {
        const validationResult = this.values.some((value) => value === subject);

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: `not one of (${this.values.join(', ')})`,
            });
        }

        return validationResult;
    }
}
