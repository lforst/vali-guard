import { Validatable } from '../types';

export default class DisjunctiveValidator<T> implements Validatable<T> {
    constructor(readonly validators: Validatable<unknown>[]) {}

    validate(subject: unknown): subject is T {
        return this.validators.some(validator => validator.validate(subject));
    }
}
