import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.string().nullable();

// Check
if (validationGuard.validate(input)) {
    const check: string | null = input;
}
