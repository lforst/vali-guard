import * as g from '../../src';
import { assert, ValidationError } from '../../src';

describe('assert()', () => {
    it('assert() should throw when validation fails', () => {
        expect(() => {
            assert(g.number(), 'not a number');
        }).toThrow(ValidationError);
    });

    it('assert() should throw when validation succeeds', () => {
        expect(() => {
            assert(g.string(), 'not a number');
        }).not.toThrow(ValidationError);
    });
});
