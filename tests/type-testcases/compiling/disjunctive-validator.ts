import * as guard from '../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.oneOf(guard.string(), guard.number());

// Check
if (validationGuard.validate(input)) {
    const check: string | number = input;
}
