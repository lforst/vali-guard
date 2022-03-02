import * as g from '../../src';

describe('NumberValidator', () => {
    it.each`
        input                 | result
        ${null}               | ${false}
        ${37}                 | ${true}
        ${3.14}               | ${true}
        ${42}                 | ${true}
        ${Math.LN2}           | ${true}
        ${Infinity}           | ${true}
        ${NaN}                | ${true}
        ${Number('1')}        | ${true}
        ${Number('shoe')}     | ${true}
        ${''}                 | ${false}
        ${'bla'}              | ${false}
        ${`template literal`} | ${false}
        ${'1'}                | ${false}
        ${typeof 1}           | ${false}
        ${String(1)}          | ${false}
        ${true}               | ${false}
        ${false}              | ${false}
        ${Boolean(1)}         | ${false}
        ${!!1}                | ${false}
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
    `('number().validate($input)', ({ input, result }) => {
        expect(g.number().validate(input)).toBe(result);
    });

    it.each`
        input                 | result
        ${null}               | ${true}
        ${37}                 | ${true}
        ${3.14}               | ${true}
        ${42}                 | ${true}
        ${Math.LN2}           | ${true}
        ${Infinity}           | ${true}
        ${NaN}                | ${true}
        ${Number('1')}        | ${true}
        ${Number('shoe')}     | ${true}
        ${''}                 | ${false}
        ${'bla'}              | ${false}
        ${`template literal`} | ${false}
        ${'1'}                | ${false}
        ${typeof 1}           | ${false}
        ${String(1)}          | ${false}
        ${true}               | ${false}
        ${false}              | ${false}
        ${Boolean(1)}         | ${false}
        ${!!1}                | ${false}
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
    `('number().nullable().validate($input)', ({ input, result }) => {
        expect(g.number().nullable().validate(input)).toBe(result);
    });

    it.each`
        input                 | result
        ${null}               | ${false}
        ${37}                 | ${true}
        ${3.14}               | ${true}
        ${42}                 | ${true}
        ${Math.LN2}           | ${true}
        ${Infinity}           | ${true}
        ${NaN}                | ${true}
        ${Number('1')}        | ${true}
        ${Number('shoe')}     | ${true}
        ${''}                 | ${false}
        ${'bla'}              | ${false}
        ${`template literal`} | ${false}
        ${'1'}                | ${false}
        ${typeof 1}           | ${false}
        ${String(1)}          | ${false}
        ${true}               | ${false}
        ${false}              | ${false}
        ${Boolean(1)}         | ${false}
        ${!!1}                | ${false}
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
    `('number().optional().validate($input)', ({ input, result }) => {
        expect(g.number().optional().validate(input)).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.number();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(0, diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.number();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('some string', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
