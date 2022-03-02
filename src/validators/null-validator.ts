import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class NullValidator extends BaseValidator<null> {
    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is null {
        const validationResult = subject === null;

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: 'not null',
            });
        }

        return validationResult;
    }
}
