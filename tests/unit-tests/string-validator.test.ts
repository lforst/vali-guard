import * as g from '../../src';

describe('StringValidator', () => {
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
        ${''}                 | ${true}
        ${'bla'}              | ${true}
        ${`template literal`} | ${true}
        ${'1'}                | ${true}
        ${typeof 1}           | ${true}
        ${String(1)}          | ${true}
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
    `('string().validate($input)', ({ input, result }) => {
        expect(g.string().validate(input)).toBe(result);
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
        ${''}                 | ${true}
        ${'bla'}              | ${true}
        ${`template literal`} | ${true}
        ${'1'}                | ${true}
        ${typeof 1}           | ${true}
        ${String(1)}          | ${true}
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
    `('string().nullable().validate($input)', ({ input, result }) => {
        expect(g.string().nullable().validate(input)).toBe(result);
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
        ${''}                 | ${true}
        ${'bla'}              | ${true}
        ${`template literal`} | ${true}
        ${'1'}                | ${true}
        ${typeof 1}           | ${true}
        ${String(1)}          | ${true}
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
    `('string().optional().validate($input)', ({ input, result }) => {
        expect(g.string().optional().validate(input)).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.string();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('some string', diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.string();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(0, diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
