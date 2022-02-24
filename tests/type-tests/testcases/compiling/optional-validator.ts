import * as guard from '../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.string().optional();

// Check
if (validationGuard.validate(input)) {
    const check: string | undefined = input;
}
