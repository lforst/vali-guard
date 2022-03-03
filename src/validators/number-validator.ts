import { ValidationDiagnostics } from '../types';
import { BaseValidator } from './base-validator';

export class NumberValidator extends BaseValidator<number> {
    validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is number {
        const subjectIsNumber = typeof subject === 'number';

        if (!subjectIsNumber) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'not number',
                });
            }
            return false;
        }

        if (Number.isInteger(subject) && !Number.isSafeInteger(subject)) {
            if (diagnostics) {
                Object.assign(diagnostics, {
                    error: 'number not safe',
                });
            }
            return false;
        }

        return true;
    }
}
