import { IValidator } from '../types';

export default abstract class BaseValidator<T> implements IValidator<T> {
    or<B>(validator: IValidator<B>): IValidator<T | B> {
        return validator;
    }

    abstract validate(subject: unknown): subject is T;
}
