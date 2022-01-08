import { ValidatableRecord, ValidatableType } from '../types';
import BaseValidator from './base-validator';

export default class ObjectValidator<V extends ValidatableRecord> extends BaseValidator<
    { [P in keyof V]: ValidatableType<V[P]> }
> {
    constructor(readonly validationRecord: V) {
        super();
    }

    // Do not wrap the guard type into its own type! - it messes with how the TS language server displays the return types
    public validate(subject: unknown): subject is { [P in keyof V]: ValidatableType<V[P]> } {
        return (
            typeof subject === 'object' &&
            subject !== null &&
            !Array.isArray(subject) &&
            Object.entries(this.validationRecord).every(([key, validator]) =>
                validator.validate((subject as Record<any, unknown>)[key])
            )
        );
    }
}
