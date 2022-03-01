import * as guard from '../../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.arrayOf(guard.string()).maxLength(4);

// Check
if (validationGuard.validate(input)) {
    const check: string[] = input;
}
