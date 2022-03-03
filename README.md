# vali-guard

![npm](https://img.shields.io/npm/v/vali-guard)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vali-guard?label=gzipped%20size)

> A somewhat flexible validation library with first-class TypeScript support.

## Install

```
npm install vali-guard
```

```
yarn add vali-guard
```

## Example

```typescript
import * as guard from 'vali-guard';

const location: unknown = ...; // Some unvalidated input?

const schema = guard.object({
    country: guard.string(), // <- strings!
    zipCode: guard.number(), // <- numbers!
    city: guard.string(),
    address: guard.string(),
    companyName: guard.string().optional(), // <- optional fields!
    person: guard.object({ // <- nested objects!
        firstName: guard.string(),
        lastName: guard.string()
    })
});

if (schema.validate(location)) {
    console.log(location.person.lastName);
    //                  ^------^------------TypeScript won't complain! :)
}
```

## API

-   [`BaseValidator`](#basevalidator)
    -   [`.validate()`](#validate)
    -   [`.optional()`](#optional)
    -   [`.nullable()`](#nullable)
-   [`Validators`](#validators)
    -   [`string()`](#string)
    -   [`number()`](#number)
    -   [`boolean()`](#boolean)
    -   [`nil()`](#nil)
    -   [`undef()`](#undef)
    -   [`unknown()`](#unknown)
    -   [`value()`](#value)
    -   [`object()`](#object)
    -   [`oneOf()`](#oneof)
    -   [`array()`](#array)
    -   [`arrayOf()`](#arrayof)

### BaseValidator

All validators that `vali-guard` provides inherit from the base validator.

```ts
interface BaseValidator {
    validate(subject: unknown, diagrnostics?: ValidationDiagnostics): boolean;
    optional(): Validator;
    nullable(): Validator;
}
```

#### .validate()

[validate]: #validate

Validates a subject. This works the same for all validators.

Example using the `string`-validator:

```ts
import * as guard from 'vali-guard';
import { ValidationDiagnostics } from 'vali-guard';

const subject: unknown = ...;
const diagnostics: ValidationDiagnostics = {};

if (guard.string().validate(subject, diagnostics)) {
    // typeof subject === string
    // TypeScript infers that `subject` is a string within this block
} else {
    console.log(diagnostics.error); // "not string"
}
```

#### .optional()

[optional]: #optional

Allows for `undefined` subjects.

```ts
import * as guard from 'vali-guard';

const subject: unknown = ...;

if (guard.string().optional().validate(subject)) {
    // typeof subject === string | undefined
}
```

#### .nullable()

[nullable]: #nullable

Allows for `null` subjects.

```ts
import * as guard from 'vali-guard';

const subject: unknown = ...;

if (guard.string().nullable().validate(subject)) {
    // typeof subject === string | null
}
```

### Validators

#### string()

[string]: #string

Validates strings.

```ts
guard.string().validate('some string'); // returns true
```

#### number()

[number]: #number

Validates numbers.

```ts
guard.number().validate(1337); // returns true
```

#### boolean()

[boolean]: #boolean

Validates boolean values.

```ts
guard.boolean().validate(false); // returns true
```

#### nil()

[nil]: #nil

Validates `null` values.

```ts
guard.nil().validate(null); // returns true
```

#### undef()

[undef]: #undef

Validates `undefined` values.

```ts
guard.undef().validate(undefined); // returns true
```

#### unknown()

[unknown]: #unknown

Validates any value. This is useful in [`object`-validators](#object) when you want to allow for a field to exist.

```ts
guard.unknown().validate(someValue); // ALWAYS returns true for ANY input
```

#### value()

[value]: #value

Validates a set of concrete primitive values. This function accepts an arbitrary amount of arguments.

```ts
guard.value('A').validate('A'); // returns true
guard.value('A').validate('B'); // returns false

guard.value('A', 'B').validate('B'); // returns true

guard.value('A', 1).validate(1); // returns true
guard.value('A', 1).validate('A'); // returns true

guard.value('A', 1, false, undefined, null, Symbol()).validate(null); // returns true
guard.value(1, 2, 3, '4', 5, 6, 7, 8, 9 /* and so on */).validate(4); // returns true
```

#### object()

[object]: #object

Validates a an object. This validator can be composed of multiple validators of any kind.

```ts
guard.object({
    string: guard.string()
    number: guard.number()
    boolean: guard.boolean()
    nil: guard.nil()
    undef: guard.undef()
    unknown: guard.unknown()
    value: guard.value(1)
});
```

Object validators will reject all objects that contain fields that are not included in the schema:

```ts
const schema = guard.object({
    a: guard.string(),
});

schema.validate({
    a: 'some string',
    b: 42,
}); // returns false
```

Fields with unknown values are supported through the [`unknown`-validator](#unknown) or the `allowUnknown` option:

```ts
const schema = guard.object({
    a: guard.string(),
    b: guard.unknown(),
});

// or

const schema = guard.object(
    {
        a: guard.string(),
    },
    {
        allowUnknown: true,
    }
);

schema.validate({
    a: 'some string',
    b: 42,
}); // returns true
```

The `object`-validator supports schemas for nested objects:

```ts
const schema = guard.object({
    a: guard.string(),
    b: guard.object({
        c: guard.number(),
    }),
});

schema.validate({
    a: 'some string',
    b: {
        c: 42,
    },
}); // returns true
```

#### oneOf()

[oneof]: #oneof

Validates a value based on a set of validators.
This validator takes two or more validators as function arguments.

```ts
const stringOrNumberValidator = guard.oneOf(guard.string(), guard.number());

stringOrNumberValidator.validate('some string'); // returns true
stringOrNumberValidator.validate(42); // returns true
```

#### array()

[array]: #array

Validates arrays with a specific length and specific items.
You should define the guard argument "as const", otherwise the order and length of the subject can not be infered.

```ts
guard.array([guard.string(), guard.number()] as const).validate(['some string', 42]); // returns true

guard.array([guard.string(), guard.number()] as const).validate('not an array'); // returns false
guard.array([guard.string(), guard.number()] as const).validate([]); // returns false
guard.array([guard.string(), guard.number()] as const).validate(['some string', 'some string']); // returns false
guard.array([guard.string(), guard.number()] as const).validate(['some string']); // returns false

guard.array([guard.number(), guard.number(), guard.number()] as const).validate([1, 2, 3]); // returns true

guard.array([guard.value(false)] as const).validate([false]); // returns true
guard.array([guard.value(false)] as const).validate([true]); // returns false
```

#### arrayOf()

[arrayof]: #arrayof

Validates arrays with containing items of a type.

```ts
guard.arrayOf(guard.number()).validate([1, 2, 3, 5, 8, 13, 21]); // returns true

const stringOrNumberGuard = guard.oneOf(guard.number(), guard.string());
guard.arrayOf(stringOrNumberGuard).validate([1, '2', 3, '5', '8', '13', 21]); // returns true

const yesNoGuard = guard.value('yes', 'no');
guard.arrayOf(yesNoGuard).validate([]); // returns true
guard.arrayOf(yesNoGuard).validate(['yes']); // returns true
guard.arrayOf(yesNoGuard).validate(['yes', 'no']); // returns true
guard.arrayOf(yesNoGuard).validate(['yes', 'yes']); // returns true
guard.arrayOf(yesNoGuard).validate(['yes', 'no', 'oui']); // returns false
```

The length of subject arrays can be restricted with the `minLength` and `maxLength` functions:

```ts
const stringArrayGuard = guard.arrayOf(guard.string());

const maxLengthGuard = stringArrayGuard.maxLength(2);
maxLengthGuard.validate(['A']); // returns true
maxLengthGuard.validate(['A', 'B']); // returns true
maxLengthGuard.validate(['A', 'B', 'C']); // returns false

const minLengthGuard = stringArrayGuard.minLength(2);
minLengthGuard.validate(['A']); // returns false
minLengthGuard.validate(['A', 'B']); // returns true
minLengthGuard.validate(['A', 'B', 'C']); // returns true

const minLengthGuard = stringArrayGuard.minLength(2).maxLength(3);
minLengthGuard.validate(['A']); // returns false
minLengthGuard.validate(['A', 'B']); // returns true
minLengthGuard.validate(['A', 'B', 'C']); // returns true
minLengthGuard.validate(['A', 'B', 'C', 'D']); // returns false
```

## Why

-   This project started out as proof-of-concept but turns out it is actually really useful.
-   Manual typecasting in TypeScript is not very satisfying.
-   For fun.

## How

TypeScript has this really cool thing called [user-defined type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
Those in combination with [fancy type inference](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) make it possible for the `validate` function to act as a guard for types that are inferred from its input.
