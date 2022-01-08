import { Validatable, ValidatableRecord, ValidatableType } from './types';
import StringValidator from './validators/string-validator';
import NumberValidator from './validators/number-validator';
import ObjectValidator from './validators/object-validator';
import DisjunctiveValidator from './validators/disjuncitive-validator';

function string(): Validatable<string> {
    return new StringValidator();
}
function number(): Validatable<number> {
    return new NumberValidator();
}

function object<R extends ValidatableRecord>(validationObject: R) {
    return new ObjectValidator<R>(validationObject);
}

function oneOf<V extends Validatable<unknown>[]>(
    ...validatables: V
): Validatable<ValidatableType<V[number]>> {
    return new DisjunctiveValidator<ValidatableType<V[number]>>(validatables);
}

export default {
    string,
    number,
    object,
    oneOf
};
