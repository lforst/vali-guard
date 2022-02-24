import * as guard from '../../../../src';

// Setup
const input: unknown = null;
const validationGuard = guard.string();

// Check
if (validationGuard.validate(input)) {
    const check: string = input;
}
