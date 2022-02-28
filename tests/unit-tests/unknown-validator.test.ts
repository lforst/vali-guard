import * as g from '../../src';

describe('UnknownValidator', () => {
    it.each([
        null,
        37,
        3.14,
        42,
        Math.LN2,
        Infinity,
        NaN,
        Number('1'),
        Number('shoe'),
        '',
        'bla',
        `template literal`,
        '1',
        typeof 1,
        String(1),
        true,
        false,
        Boolean(1),
        !!1,
        Symbol(),
        Symbol('foo'),
        Symbol.iterator,
        undefined,
        { a: 1 },
        [1, 2, 4],
        new Date(),
        /regex/,
        () => undefined,
        class C {},
        Math.sin
    ])('should approve any input', input => {
        expect(g.unknown().validate(input)).toBe(true);
    });

    it('should not set a diagnostic', () => {
        const guard = g.undef();
        const diagnostic: g.ValidationDiagnostics = {};
        guard.validate(undefined, diagnostic);

        expect(diagnostic.error).toBeUndefined();
    });

    it('should allow for unknown fields in object validators', () => {
        const guard = g.object({
            a: g.string(),
            b: g.unknown()
        });

        expect(guard.validate({ a: 'some string', b: 'some value' })).toBe(true);
        expect(guard.validate({ a: 'some string', b: undefined })).toBe(true);
        expect(guard.validate({ a: 'some string' })).toBe(true);
    });
});
