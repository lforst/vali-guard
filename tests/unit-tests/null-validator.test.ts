import * as g from '../../src';

describe('NullValidator', () => {
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
    `('nil().validate($input)', ({ input, result }) => {
        expect(g.nil().validate(input)).toBe(result);
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
    `('nil().nullable().validate($input)', ({ input, result }) => {
        expect(
            g
                .nil()
                .nullable()
                .validate(input)
        ).toBe(result);
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
    `('nil().optional().validate($input)', ({ input, result }) => {
        expect(
            g
                .nil()
                .optional()
                .validate(input)
        ).toBe(result);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.nil();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(null, diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.nil();

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('some string', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
