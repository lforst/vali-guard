import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.fun();

// Check
if (validationGuard.validate(input)) {
    // function return type is unknown, which should not be castable to undefined
    const check: undefined = input();
}
