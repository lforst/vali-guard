import * as guard from '../../src';

describe('UndefinedValidator', () => {
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
    `('undef().validate($input)', ({ input, result }) => {
        expect(guard.undef().validate(input)).toBe(result);
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
    `('undef().nullable().validate($input)', ({ input, result }) => {
        expect(
            guard
                .undef()
                .nullable()
                .validate(input)
        ).toBe(result);
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
    `('undef().optional().validate($input)', ({ input, result }) => {
        expect(
            guard
                .undef()
                .optional()
                .validate(input)
        ).toBe(result);
    });
});
