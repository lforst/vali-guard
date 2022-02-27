import * as g from '../../../src';

describe('ExactObjectValidator', () => {
    it.each`
        guard                               | input                     | result
        ${{}}                               | ${null}                   | ${false}
        ${{}}                               | ${{}}                     | ${true}
        ${{}}                               | ${{ a: 1 }}               | ${false}
        ${{ a: g.number() }}                | ${null}                   | ${false}
        ${{ a: g.number() }}                | ${{}}                     | ${false}
        ${{ a: g.number() }}                | ${{ a: 1 }}               | ${true}
        ${{ a: g.number() }}                | ${{ a: 1, b: '2' }}       | ${false}
        ${{ a: g.number(), b: g.string() }} | ${null}                   | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{}}                     | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1 }}               | ${false}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1, b: '2' }}       | ${true}
        ${{ a: g.number(), b: g.string() }} | ${{ a: 1, b: '2', c: 3 }} | ${false}
    `('object($guard).exact().validate($input)', ({ guard, input, result }) => {
        expect(g.object(guard).validate(input)).toBe(result);
    });

    it.each`
        guard                | input               | result
        ${{}}                | ${null}             | ${true}
        ${{}}                | ${{}}               | ${true}
        ${{}}                | ${{ a: 1 }}         | ${false}
        ${{ a: g.number() }} | ${null}             | ${true}
        ${{ a: g.number() }} | ${{}}               | ${false}
        ${{ a: g.number() }} | ${{ a: 1 }}         | ${true}
        ${{ a: g.number() }} | ${{ a: 1, b: '2' }} | ${false}
    `('object($guard).exact().nullable().validate($input)', ({ guard, input, result }) => {
        expect(
            g
                .object(guard)
                .nullable()
                .validate(input)
        ).toBe(result);
    });

    it('should not require optional fields to to exist', () => {
        const guard = g.object({
            a: g.string().optional()
        });

        expect(guard.validate({ a: undefined })).toBe(true);
        expect(guard.validate({})).toBe(true);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.object({
            a: g.number()
        });

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate({ a: 1 }, diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails because of unknown fields', () => {
        const guard = g.object({
            a: g.string()
        });

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate({ a: 'some string', b: 'some unknown field' }, diagnostic)).toBe(
            false
        );
        expect(diagnostic.error).toBeDefined();
    });

    it('should set a diagnostic when when subject is not an object', () => {
        const guard = g.object({
            a: g.string()
        });

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('not an object', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });

    it('should set diagnostic for faulty object fields', () => {
        const guard = g.object({
            a: g.number()
        });

        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate({ a: 'not a number' }, diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });

    it('should set diagnostic for nested validation failure', () => {
        const guard = g.object({
            a: g.object({
                a: g.string()
            })
        });

        const diagnostic: g.ValidationDiagnostics = {};

        expect(
            guard.validate({ a: { a: 'some string', b: 'some unknown field' } }, diagnostic)
        ).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
