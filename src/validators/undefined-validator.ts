import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class UndefinedValidator extends BaseValidator<undefined> {
    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is undefined {
        const validationResult = subject === undefined;

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: 'not undefined'
            });
        }

        return validationResult;
    }
}
