import { Primitive, Validatable } from './types';
import { ArrayOfValidator } from './validators/array-of-validator';
import { ArrayValidator } from './validators/array-validator';
import { BooleanValidator } from './validators/boolean-validator';
import { DisjunctiveValidator } from './validators/disjuncitive-validator';
import { NullValidator } from './validators/null-validator';
import { NumberValidator } from './validators/number-validator';
import { ObjectValidator, ObjectValidatorOptions } from './validators/object-validator';
import { StringValidator } from './validators/string-validator';
import { UndefinedValidator } from './validators/undefined-validator';
import { UnknownValidator } from './validators/unknown-validator';
import { ValueValidator } from './validators/value-validator';

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

export function value<T extends [Primitive, ...Primitive[]]>(...values: T) {
    return new ValueValidator(values);
}

export function object<V extends Record<string, Validatable<unknown>>>(
    validationObject: V,
    options?: ObjectValidatorOptions
) {
    return new ObjectValidator<V>(validationObject, options);
}

/**
 * For the return-type inference to work as intended, mark the validation Array "as const".
 *
 * Example:
 *
 * ```ts
 * import * as guard from 'vali-guard';
 *
 * const validator = guard.array([
 *   guard.string(),
 *   guard.number()
 * ] as const) // <-- "as const" here is important
 *
 * if (validator.validate(input)) {
 *   type validatedType = typeof input; // === [string, number]
 * }
 * ```
 */
export function array<T extends readonly Validatable<unknown>[]>(validationArray: T) {
    return new ArrayValidator(validationArray);
}

export function arrayOf<T extends Validatable<unknown>>(validator: T) {
    return new ArrayOfValidator(validator);
}

export function oneOf<V extends [Validatable<unknown>, ...Validatable<unknown>[]]>(
    ...validatables: V
) {
    return new DisjunctiveValidator(validatables);
}
