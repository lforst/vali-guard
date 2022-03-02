import * as g from '../../src';

describe('DisjunctiveValidator', () => {
    it.each`
        v1            | t1            | v2            | t2            | input            | result
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${'some string'} | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${42}            | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${null}          | ${false}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${undefined}     | ${false}
        ${g.string()} | ${'string()'} | ${g.string()} | ${'string()'} | ${'some string'} | ${true}
        ${g.string()} | ${'string()'} | ${g.string()} | ${'string()'} | ${42}            | ${false}
    `('oneOf($t1, $t2).validate($input)', ({ v1, v2, input, result }) => {
        expect(g.oneOf(v1, v2).validate(input)).toBe(result);
    });

    it.each`
        v1            | t1            | v2            | t2            | v3         | t3         | input            | result
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${g.nil()} | ${'nil()'} | ${'some string'} | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${g.nil()} | ${'nil()'} | ${42}            | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${g.nil()} | ${'nil()'} | ${null}          | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${g.nil()} | ${'nil()'} | ${undefined}     | ${false}
    `('oneOf($t1, $t2, $t3).validate($input)', ({ v1, v2, v3, input, result }) => {
        expect(g.oneOf(v1, v2, v3).validate(input)).toBe(result);
    });

    it.each`
        v1            | t1            | v2            | t2            | input            | result
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${'some string'} | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${42}            | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${null}          | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${undefined}     | ${false}
    `('oneOf($t1, $t2).nullable().validate($input)', ({ v1, v2, input, result }) => {
        expect(g.oneOf(v1, v2).nullable().validate(input)).toBe(result);
    });

    it.each`
        v1            | t1            | v2            | t2            | input            | result
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${'some string'} | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${42}            | ${true}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${null}          | ${false}
        ${g.string()} | ${'string()'} | ${g.number()} | ${'number()'} | ${undefined}     | ${true}
    `('oneOf($t1, $t2).optional().validate($input)', ({ v1, v2, input, result }) => {
        expect(g.oneOf(v1, v2).optional().validate(input)).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.oneOf(g.string(), g.number());

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('some string', diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.oneOf(g.string(), g.number());

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(null, diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
