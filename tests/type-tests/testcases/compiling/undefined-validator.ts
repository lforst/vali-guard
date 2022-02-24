import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.undef();

// Check
if (validationGuard.validate(input)) {
    const check: undefined = input;
}
