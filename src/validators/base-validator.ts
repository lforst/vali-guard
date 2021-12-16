import { IValidator } from '../types';
import DisjunctiveValidator from './disjuncitive-validator';
import NullValidator from './null-validator';
import UndefinedValidator from './undefined-validator';

export default abstract class BaseValidator<T> implements IValidator<T> {
    optional(): IValidator<undefined | T> {
        return new DisjunctiveValidator([this, new UndefinedValidator()]);
    }

    nullable(): IValidator<null | T> {
        return new DisjunctiveValidator([this, new NullValidator()]);
    }

    abstract validate(subject: unknown): subject is T;
}
