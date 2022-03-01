import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.value(undefined);

// Check
if (validationGuard.validate(input)) {
    const check: null = input;
}
