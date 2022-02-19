import * as g from '../../src';

describe('ObjectValidator', () => {
    it.each`
        guard                               | input               | result
        ${{}}                               | ${null}             | ${false}
        ${{}}                               | ${{}}               | ${true}
        ${{}}                               | ${{ a: 1 }}         | ${true}
        ${{ a: g.number() }}                | ${null}             | ${false}
        ${{ a: g.number() }}                | ${{}}               | ${false}
        ${{ a: g.number() }}                | ${{ a: 1 }}         | ${true}
        ${{ a: g.number() }}                | ${{ a: 1, b: '2' }} | ${true}
        ${{ a: g.number(), b: g.string() }} | ${null}             | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{}}               | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1 }}         | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1, b: '2' }} | ${true}
    `('object($guard).validate($input)', ({ guard, input, result }) => {
        expect(g.object(guard).validate(input)).toBe(result);
    });

    it.each`
        guard                | input               | result
        ${{}}                | ${null}             | ${true}
        ${{}}                | ${{}}               | ${true}
        ${{}}                | ${{ a: 1 }}         | ${true}
        ${{ a: g.number() }} | ${null}             | ${true}
        ${{ a: g.number() }} | ${{}}               | ${false}
        ${{ a: g.number() }} | ${{ a: 1 }}         | ${true}
        ${{ a: g.number() }} | ${{ a: 1, b: '2' }} | ${true}
    `('object($guard).nullable().validate($input)', ({ guard, input, result }) => {
        expect(
            g
                .object(guard)
                .nullable()
                .validate(input)
        ).toBe(result);
    });

    it('complex and recursive', () => {
        const guard = g.object({
            a: g.number(),
            b: g.string(),
            c: g.string().optional(),
            d: g.string().nullable(),
            e: g.object({
                a: g.number(),
                b: g.nil(),
                c: g.object({})
            }),
            f: g
                .object({
                    a: g.string()
                })
                .nullable(),
            g: g
                .object({
                    a: g.string()
                })
                .optional()
        });

        expect(
            guard.validate({
                a: 1,
                b: '',
                c: undefined,
                d: null,
                e: {
                    a: 1,
                    b: null,
                    c: {}
                },
                f: null,
                g: undefined
            })
        ).toBe(true);

        expect(
            guard.validate({
                a: 1,
                b: '',
                // c: undefined,
                d: null,
                e: {
                    a: 1,
                    b: null,
                    c: {}
                },
                f: null
                // g: undefined
            })
        ).toBe(true);

        expect(
            guard.validate({
                a: '', // <- wrong
                b: '',
                c: undefined,
                d: null,
                e: {
                    a: 1,
                    b: null,
                    c: {}
                },
                f: null,
                g: undefined
            })
        ).toBe(false);

        expect(
            guard.validate({
                a: 1,
                b: '',
                c: undefined,
                d: null,
                e: {
                    a: '', // <- wrong
                    b: null,
                    c: {}
                },
                f: null,
                g: undefined
            })
        ).toBe(false);
    });
});
