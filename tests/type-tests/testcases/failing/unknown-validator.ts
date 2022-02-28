import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.object({
    a: guard.string(),
    b: guard.unknown()
});

// Check
if (validationGuard.validate(input)) {
    const check: { a: string; b: undefined } = input;
}
