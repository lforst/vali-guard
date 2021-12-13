import { ValidationRecord, ValidatorType } from '../types';
import BaseValidator from './base-validator';

export default class ObjectValidator<V extends ValidationRecord> extends BaseValidator<
    { [P in keyof V]: ValidatorType<V[P]> }
> {
    constructor(readonly validationRecord: V) {
        super();
    }

    // Do not wrap the guard type into its own type! - it messes with how the TS language server displays the return types
    public validate(subject: unknown): subject is { [P in keyof V]: ValidatorType<V[P]> } {
        return typeof subject === 'string';
    }
}
