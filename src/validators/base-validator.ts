import { Validatable } from '../types';

export abstract class BaseValidator<T> implements Validatable<T> {
    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    optional(): Validatable<undefined | T> {
        return {
            validate: (subject: unknown): subject is undefined | T => {
                return this.validate(subject) || typeof subject === 'undefined';
            }
        };
    }

    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    nullable(): Validatable<null | T> {
        return {
            validate: (subject: unknown): subject is null | T => {
                return this.validate(subject) || subject === null;
            }
        };
    }

    abstract validate(subject: unknown): subject is T;
}
