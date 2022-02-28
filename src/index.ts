import { Validatable } from './types';
import { BooleanValidator } from './validators/boolean-validator';
import { DisjunctiveValidator } from './validators/disjuncitive-validator';
import { NullValidator } from './validators/null-validator';
import { NumberValidator } from './validators/number-validator';
import { ObjectValidator, ObjectValidatorOptions } from './validators/object-validator';
import { StringValidator } from './validators/string-validator';
import { UndefinedValidator } from './validators/undefined-validator';
import { UnknownValidator } from './validators/unknown-validator';

export { ValidationDiagnostics } from './types';

export function string() {
    return new StringValidator();
}

export function number() {
    return new NumberValidator();
}

export function boolean() {
    return new BooleanValidator();
}

export function nil() {
    return new NullValidator();
}

export function undef() {
    return new UndefinedValidator();
}

export function unknown() {
    return new UnknownValidator();
}

export function object<V extends Record<string, Validatable<unknown>>>(
    validationObject: V,
    options?: ObjectValidatorOptions
) {
    return new ObjectValidator<V>(validationObject, options);
}

export function oneOf<V extends Validatable<unknown>[]>(...validatables: V) {
    return new DisjunctiveValidator(validatables);
}
