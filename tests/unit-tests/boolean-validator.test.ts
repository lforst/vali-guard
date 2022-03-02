import * as g from '../../src';

describe('BooleanValidator', () => {
    it.each`
        input                 | result
        ${null}               | ${false}
        ${37}                 | ${false}
        ${3.14}               | ${false}
        ${42}                 | ${false}
        ${Math.LN2}           | ${false}
        ${Infinity}           | ${false}
        ${NaN}                | ${false}
        ${Number('1')}        | ${false}
        ${Number('shoe')}     | ${false}
        ${''}                 | ${false}
        ${'bla'}              | ${false}
        ${`template literal`} | ${false}
        ${'1'}                | ${false}
        ${typeof 1}           | ${false}
        ${String(1)}          | ${false}
        ${true}               | ${true}
        ${false}              | ${true}
        ${Boolean(1)}         | ${true}
        ${!!1}                | ${true}
        ${Symbol()}           | ${false}
        ${Symbol('foo')}      | ${false}
        ${Symbol.iterator}    | ${false}
        ${undefined}          | ${false}
        ${{ a: 1 }}           | ${false}
        ${[1, 2, 4]}          | ${false}
        ${new Date()}         | ${false}
        ${/regex/}            | ${false}
        ${() => undefined}    | ${false}
        ${class C {}}         | ${false}
        ${Math.sin}           | ${false}
    `('boolean().validate($input)', ({ input, result }) => {
        expect(g.boolean().validate(input)).toBe(result);
    });

    it.each`
        input                 | result
        ${null}               | ${true}
        ${37}                 | ${false}
        ${3.14}               | ${false}
        ${42}                 | ${false}
        ${Math.LN2}           | ${false}
        ${Infinity}           | ${false}
        ${NaN}                | ${false}
        ${Number('1')}        | ${false}
        ${Number('shoe')}     | ${false}
        ${''}                 | ${false}
        ${'bla'}              | ${false}
        ${`template literal`} | ${false}
        ${'1'}                | ${false}
        ${typeof 1}           | ${false}
        ${String(1)}          | ${false}
        ${true}               | ${true}
        ${false}              | ${true}
        ${Boolean(1)}         | ${true}
        ${!!1}                | ${true}
        ${Symbol()}           | ${false}
        ${Symbol('foo')}      | ${false}
        ${Symbol.iterator}    | ${false}
        ${undefined}          | ${false}
        ${{ a: 1 }}           | ${false}
        ${[1, 2, 4]}          | ${false}
        ${new Date()}         | ${false}
        ${/regex/}            | ${false}
        ${() => undefined}    | ${false}
        ${class C {}}         | ${false}
        ${Math.sin}           | ${false}
    `('boolean().nullable().validate($input)', ({ input, result }) => {
        expect(g.boolean().nullable().validate(input)).toBe(result);
    });

    it.each`
        input                 | result
        ${null}               | ${false}
        ${37}                 | ${false}
        ${3.14}               | ${false}
        ${42}                 | ${false}
        ${Math.LN2}           | ${false}
        ${Infinity}           | ${false}
        ${NaN}                | ${false}
        ${Number('1')}        | ${false}
        ${Number('shoe')}     | ${false}
        ${''}                 | ${false}
        ${'bla'}              | ${false}
        ${`template literal`} | ${false}
        ${'1'}                | ${false}
        ${typeof 1}           | ${false}
        ${String(1)}          | ${false}
        ${true}               | ${true}
        ${false}              | ${true}
        ${Boolean(1)}         | ${true}
        ${!!1}                | ${true}
        ${Symbol()}           | ${false}
        ${Symbol('foo')}      | ${false}
        ${Symbol.iterator}    | ${false}
        ${undefined}          | ${true}
        ${{ a: 1 }}           | ${false}
        ${[1, 2, 4]}          | ${false}
        ${new Date()}         | ${false}
        ${/regex/}            | ${false}
        ${() => undefined}    | ${false}
        ${class C {}}         | ${false}
        ${Math.sin}           | ${false}
    `('boolean().optional().validate($input)', ({ input, result }) => {
        expect(g.boolean().optional().validate(input)).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.boolean();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(false, diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.boolean();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('some string', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
