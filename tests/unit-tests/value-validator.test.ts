import * as g from '../../src';

const symbol1 = Symbol(1);
const symbol2 = Symbol(2);

describe('ValueValidator', () => {
    it.each`
        value        | input        | result
        ${1}         | ${1}         | ${true}
        ${1}         | ${2}         | ${false}
        ${'a'}       | ${'a'}       | ${true}
        ${'a'}       | ${'b'}       | ${false}
        ${''}        | ${''}        | ${true}
        ${true}      | ${true}      | ${true}
        ${true}      | ${false}     | ${false}
        ${false}     | ${true}      | ${false}
        ${false}     | ${false}     | ${true}
        ${null}      | ${null}      | ${true}
        ${null}      | ${undefined} | ${false}
        ${undefined} | ${undefined} | ${true}
        ${undefined} | ${null}      | ${false}
        ${symbol1}   | ${symbol1}   | ${true}
        ${symbol1}   | ${symbol2}   | ${false}
    `('value($value).validate($input)', ({ value, input, result }) => {
        expect(g.value(value).validate(input)).toBe(result);
    });

    it.each`
        values                            | input        | result
        ${[1, 'a']}                       | ${1}         | ${true}
        ${[1, 'a']}                       | ${'a'}       | ${true}
        ${[1, 'a']}                       | ${0}         | ${false}
        ${[1, 'a']}                       | ${'b'}       | ${false}
        ${[1, 'a', null, undefined, 'b']} | ${'b'}       | ${true}
        ${[1, 'a', null, undefined, 'b']} | ${undefined} | ${true}
        ${[1, 'a', null, undefined, 'b']} | ${symbol1}   | ${false}
    `('value(...$values).validate($input)', ({ values, input, result }) => {
        expect(g.value(...values).validate(input)).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.value(1);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(1, diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.value(1);
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('a', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
