import * as g from '../../src';
import { NonDiagnosingValidator } from './utils/non-diagnosing-validator';

describe('ArrayValidator', () => {
    it.each`
        guard                       | input               | result
        ${[]}                       | ${null}             | ${false}
        ${[]}                       | ${[]}               | ${true}
        ${[]}                       | ${['test']}         | ${false}
        ${[g.string()]}             | ${'test'}           | ${false}
        ${[g.string()]}             | ${['test']}         | ${true}
        ${[g.string()]}             | ${[1]}              | ${false}
        ${[g.value(1)]}             | ${[1]}              | ${true}
        ${[g.value(1)]}             | ${[2]}              | ${false}
        ${[g.string(), g.number()]} | ${['test', 1]}      | ${true}
        ${[g.string(), g.number()]} | ${['test', 'test']} | ${false}
        ${[g.string(), g.number()]} | ${[1]}              | ${false}
        ${[g.string(), g.number()]} | ${['test']}         | ${false}
    `('array($guard).validate($input)', ({ guard, input, result }) => {
        expect(g.array(guard).validate(input)).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.array([g.string()]);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(['test'], diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when subject length does not match', () => {
        const guard = g.array([g.string()]);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate([], diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });

    it('should set a diagnostic when array item validation failed', () => {
        const guard = g.array([g.string()]);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate([1], diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });

    it('should set a diagnostic when subject is not an array', () => {
        const guard = g.array([g.string()]);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('some string', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });

    it('should still set a diagnostic when a provided validator does not set a diagnostic on failed validation', () => {
        const guard = g.array([new NonDiagnosingValidator()]);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(['anything'], diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
