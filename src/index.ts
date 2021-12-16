import { IValidator, ValidatorType } from './types';
import StringValidator from './validators/string-validator';
import NumberValidator from './validators/number-validator';
import ObjectValidator from './validators/object-validator';
import DisjunctiveValidator from './validators/disjuncitive-validator';

function string(): IValidator<string> {
    return new StringValidator();
}
function number(): IValidator<number> {
    return new NumberValidator();
}

function object<R extends Record<string | number | symbol, IValidator<unknown>>>(
    validationRecord: R
) {
    return new ObjectValidator<R>(validationRecord);
}

function oneOf<V extends IValidator<unknown>[]>(
    ...validators: V
): IValidator<ValidatorType<V[number]>> {
    return new DisjunctiveValidator<ValidatorType<V[number]>>(validators);
}

export default {
    string,
    number,
    object,
    oneOf
};
