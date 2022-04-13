import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class FunctionValidator extends BaseValidator<(...args: unknown[]) => unknown> {
    validate(
        subject: unknown,
        diagnostics?: ValidationDiagnostics
    ): subject is (...args: unknown[]) => unknown {
        const validationResult = typeof subject === 'function';

        if (!validationResult && diagnostics) {
            Object.assign(diagnostics, {
                error: 'not function',
            });
        }

        return validationResult;
    }
}
