import { Validatable, ValidatableType } from '../types';
import { BaseValidator } from './base-validator';

export class DisjunctiveValidator<V extends Validatable<unknown>[]>
    extends BaseValidator<ValidatableType<V[number]>>
    implements Validatable<ValidatableType<V[number]>> {
    private readonly validators: V;

    constructor(validators: V) {
        super();
        this.validators = validators;
    }

    validate(subject: unknown): subject is ValidatableType<V[number]> {
        return this.validators.some(validator => validator.validate(subject));
    }
}
