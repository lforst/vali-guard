import { Validatable, ValidationDiagnostics } from './types';
import { StringValidator } from './validators/string-validator';
import { NumberValidator } from './validators/number-validator';
import { ObjectValidator } from './validators/object-validator';
import { DisjunctiveValidator } from './validators/disjuncitive-validator';
import { NullValidator } from './validators/null-validator';
import { UndefinedValidator } from './validators/undefined-validator';

function string() {
    return new StringValidator();
}

function number() {
    return new NumberValidator();
}

function nil() {
    return new NullValidator();
}

function undef() {
    return new UndefinedValidator();
}

function object<
    V extends {
        [key: string]: Validatable<unknown>;
        [key: number]: Validatable<unknown>;
    }
>(validationObject: V) {
    return new ObjectValidator<V>(validationObject);
}

function oneOf<V extends Validatable<unknown>[]>(...validatables: V) {
    return new DisjunctiveValidator(validatables);
}

export { string, number, object, oneOf, nil, undef, ValidationDiagnostics };
