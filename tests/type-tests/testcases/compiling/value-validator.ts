import * as guard from '../../../../src';

// Setup
const input: unknown = 1;
const validationGuard = guard.value('test', 1, undefined, null);

// Check
if (validationGuard.validate(input)) {
    const check: 1 | 'test' | null | undefined = input;
}
