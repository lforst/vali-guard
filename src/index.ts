import { IValidator } from './types';
import StringValidator from './validators/string-validator';
import NumberValidator from './validators/number-validator';
import ObjectValidator from './validators/object-validator';

function string() {
    return new StringValidator();
}

function number() {
    return new NumberValidator();
}

function object<T extends Record<string | number | symbol, IValidator<unknown>>>(
    validationRecord: T
) {
    return new ObjectValidator<T>(validationRecord);
}

export default {
    string,
    number,
    object
};
