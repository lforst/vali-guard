import * as guard from '../../../../src';

// Setup
const input: unknown = null;
const validationGuard = guard.boolean();

// Check
if (validationGuard.validate(input)) {
    const check: false | true = input;
}
