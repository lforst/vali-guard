import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class BooleanValidator extends BaseValidator<boolean> {
    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is boolean {
        const validationResult = typeof subject === 'boolean';

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: 'not boolean',
            });
        }

        return validationResult;
    }
}
