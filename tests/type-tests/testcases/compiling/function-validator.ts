import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.fun();

// Check
if (validationGuard.validate(input)) {
    const check: () => unknown = input;

    // we should be able to call the checked function with arbitrary arguments
    input(1, '2', null);
}
