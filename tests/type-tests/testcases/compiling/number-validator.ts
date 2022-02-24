import * as guard from '../../../../src';

// Setup
const input: unknown = null;
const validationGuard = guard.number();

// Check
if (validationGuard.validate(input)) {
    const check: number = input;
}
