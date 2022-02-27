import * as g from '../../../src';

describe('ObjectValidator with `allowUnknown: true` option', () => {
    it.each`
        guard                               | input                     | result
        ${{}}                               | ${null}                   | ${false}
        ${{}}                               | ${{}}                     | ${true}
        ${{}}                               | ${{ a: 1 }}               | ${true}
        ${{ a: g.number() }}                | ${null}                   | ${false}
        ${{ a: g.number() }}                | ${{}}                     | ${false}
        ${{ a: g.number() }}                | ${{ a: 1 }}               | ${true}
        ${{ a: g.number() }}                | ${{ a: 1, b: '2' }}       | ${true}
        ${{ a: g.number(), b: g.string() }} | ${null}                   | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{}}                     | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1 }}               | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1, b: '2' }}       | ${true}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1, b: '2', c: 3 }} | ${true}
    `('object($guard, { allowUnknown: true }).validate($input)', ({ guard, input, result }) => {
        expect(g.object(guard, { allowUnknown: true }).validate(input)).toBe(result);
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
    `(
        'object($guard, { allowUnknown: true }).nullable().validate($input)',
        ({ guard, input, result }) => {
            expect(
                g
                    .object(guard, { allowUnknown: true })
                    .nullable()
                    .validate(input)
            ).toBe(result);
        }
    );

    it('should not set a diagnostic when subject contains unknown field', () => {
        const guard = g.object(
            {
                a: g.number()
            },
            { allowUnknown: true }
        );

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate({ a: 1, b: 'some unknown field' }, diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });
});
