# vali-guard

> A somewhat flexible proof-of-concept validation library with TypeScript type-safety.

## Why

-   I always wondered if this was possible - turns out it is!
-   Validation is nice but static analysis on top is even nicer.
-   Code completion!

## Install

```
$ npm install vali-guard
```

## Example

```typescript
import * as guard from 'vali-guard';

const location = ...; // Some unvalidated input?

const mailingLocationValidator = guard.object({
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

if (mailingLocationValidator.validate(location)) {
    console.log(location.person.lastName);
    //                  ^------^------------TypeScript won't complain! :)
}
```

## How

TypeScript has this really cool thing called [user-defined type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates). Those in combination with [fancy type inference](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) make it possible for the `validate` function to act as a guard for types that are inferred from its input.
