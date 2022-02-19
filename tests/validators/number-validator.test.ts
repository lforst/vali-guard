import * as guard from '../../src';

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
        expect(guard.number().validate(input)).toBe(result);
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
        expect(
            guard
                .number()
                .nullable()
                .validate(input)
        ).toBe(result);
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
        expect(
            guard
                .number()
                .optional()
                .validate(input)
        ).toBe(result);
    });
});
