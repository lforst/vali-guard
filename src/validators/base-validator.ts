import { Validatable, ValidationDiagnostics } from '../types';

export abstract class BaseValidator<T> implements Validatable<T> {
    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    optional() {
        const superValidate = this.validate.bind(this);
        return new (class extends BaseValidator<undefined | T> {
            validate(
                subject: unknown,
                diagnostics?: ValidationDiagnostics
            ): subject is undefined | T {
                const localDiagnostics: ValidationDiagnostics = {};
                if (superValidate(subject, localDiagnostics) || subject === undefined) {
                    return true;
                } else {
                    if (diagnostics) {
                        Object.assign(diagnostics, {
                            error: `${localDiagnostics.error ?? 'unknown error'} AND not undefined`
                        });
                    }
                    return false;
                }
            }
        })();
    }

    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    nullable() {
        const superValidate = this.validate.bind(this);
        return new (class extends BaseValidator<null | T> {
            validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is null | T {
                const localDiagnostics: ValidationDiagnostics = {};
                if (superValidate(subject, localDiagnostics) || subject === null) {
                    return true;
                } else {
                    if (diagnostics) {
                        Object.assign(diagnostics, {
                            error: `${localDiagnostics.error ?? 'unknown error'} AND not null`
                        });
                    }
                    return false;
                }
            }
        })();
    }

    abstract validate(subject: unknown, diagnostics?: ValidationDiagnostics): subject is T;
}
