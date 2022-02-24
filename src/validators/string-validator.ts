import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class StringValidator extends BaseValidator<string> {
    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is string {
        const validationResult = typeof subject === 'string';

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: 'not string'
            });
        }

        return validationResult;
    }
}
