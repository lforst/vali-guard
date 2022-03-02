import * as guard from '../../../../../src';

// Setup
const input: unknown = null;
const validationGuard = guard.object(
    {
        a: guard.string(),
        b: guard.object(
            {
                a: guard.number(),
                b: guard.undef(),
            },
            { allowUnknown: true }
        ),
    },
    { allowUnknown: true }
);

// Check
if (validationGuard.validate(input)) {
    const check: { a: string; b: { a: number; b: undefined } } = input;
}
