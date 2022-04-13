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

export type { ValidationDiagnostics } from './types';

/*@__PURE__*/
export function string() {
    return new StringValidator();
}

/*@__PURE__*/
export function number() {
    return new NumberValidator();
}

/*@__PURE__*/
export function boolean() {
    return new BooleanValidator();
}

/*@__PURE__*/
export function nil() {
    return new NullValidator();
}

/*@__PURE__*/
export function undef() {
    return new UndefinedValidator();
}

/*@__PURE__*/
export function unknown() {
    return new UnknownValidator();
}

/*@__PURE__*/
export function value<T extends [Primitive, ...Primitive[]]>(...values: T) {
    return new ValueValidator(values);
}

/*@__PURE__*/
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
/*@__PURE__*/
export function array<T extends readonly Validatable<unknown>[]>(validationArray: T) {
    return new ArrayValidator(validationArray);
}

/*@__PURE__*/
export function arrayOf<T extends Validatable<unknown>>(validator: T) {
    return new ArrayOfValidator(validator);
}

/*@__PURE__*/
export function oneOf<V extends [Validatable<unknown>, ...Validatable<unknown>[]]>(
    ...validatables: V
) {
    return new DisjunctiveValidator(validatables);
}
