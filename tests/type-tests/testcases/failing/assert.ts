import * as guard from '../../../../src';
import { assert } from '../../../../src';

// Setup
const input: unknown = null;
const validationGuard = guard.string();

// Check
assert(validationGuard, input);
const check: number = input;
