import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class NumberValidator extends BaseValidator<number> {
    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is number {
        const validationResult = typeof subject === 'number';

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: 'not number'
            });
        }

        return validationResult;
    }
}
