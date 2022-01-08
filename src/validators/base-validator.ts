import { Validatable } from '../types';
import DisjunctiveValidator from './disjuncitive-validator';
import NullValidator from './null-validator';
import UndefinedValidator from './undefined-validator';

export default abstract class BaseValidator<T> implements Validatable<T> {
    optional(): Validatable<undefined | T> {
        return new DisjunctiveValidator([this, new UndefinedValidator()]);
    }

    /**
     * For the return-type inference to work, set `strictNullChecks: true` or `strict: true` in your tsconfig.
     */
    nullable(): Validatable<null | T> {
        return new DisjunctiveValidator([this, new NullValidator()]);
    }

    abstract validate(subject: unknown): subject is T;
}
