import * as g from '../../src';

describe('ArrayOfValidator', () => {
    it.each`
        guard                              | input            | result
        ${g.string()}                      | ${'test'}        | ${false}
        ${g.string()}                      | ${[]}            | ${true}
        ${g.string()}                      | ${['a']}         | ${true}
        ${g.string()}                      | ${['a', 'b']}    | ${true}
        ${g.string()}                      | ${[1]}           | ${false}
        ${g.string()}                      | ${['a', 1]}      | ${false}
        ${g.oneOf(g.string(), g.number())} | ${['a', 1, 'b']} | ${true}
        ${g.oneOf(g.string(), g.number())} | ${['a', 'b']}    | ${true}
        ${g.value(1)}                      | ${[1, 1]}        | ${true}
        ${g.value(1)}                      | ${[1, 2]}        | ${false}
    `('arrayOf($guard).validate($input)', ({ guard, input, result }) => {
        expect(g.arrayOf(guard).validate(input)).toBe(result);
    });

    it.each`
        maxLength | input               | result
        ${-1}     | ${[]}               | ${false}
        ${0}      | ${[]}               | ${true}
        ${1}      | ${[]}               | ${true}
        ${2}      | ${[]}               | ${true}
        ${-1}     | ${['test']}         | ${false}
        ${0}      | ${['test']}         | ${false}
        ${1}      | ${['test']}         | ${true}
        ${2}      | ${['test']}         | ${true}
        ${-1}     | ${['test', 'test']} | ${false}
        ${0}      | ${['test', 'test']} | ${false}
        ${1}      | ${['test', 'test']} | ${false}
        ${2}      | ${['test', 'test']} | ${true}
    `(
        'arrayOf(string()).maxLength($maxLength).validate($input)',
        ({ maxLength, input, result }) => {
            expect(
                g
                    .arrayOf(g.string())
                    .maxLength(maxLength)
                    .validate(input)
            ).toBe(result);
        }
    );

    it.each`
        minLength | input     | result
        ${-1}     | ${[]}     | ${true}
        ${0}      | ${[]}     | ${true}
        ${1}      | ${[]}     | ${false}
        ${2}      | ${[]}     | ${false}
        ${-1}     | ${[1]}    | ${true}
        ${0}      | ${[1]}    | ${true}
        ${1}      | ${[1]}    | ${true}
        ${2}      | ${[1]}    | ${false}
        ${-1}     | ${[1, 1]} | ${true}
        ${0}      | ${[1, 1]} | ${true}
        ${1}      | ${[1, 1]} | ${true}
        ${2}      | ${[1, 1]} | ${true}
    `(
        'arrayOf(number()).minLength($minLength).validate($input)',
        ({ minLength, input, result }) => {
            expect(
                g
                    .arrayOf(g.number())
                    .minLength(minLength)
                    .validate(input)
            ).toBe(result);
        }
    );

    it.each`
        minLength | maxLength | input           | result
        ${1}      | ${3}      | ${[]}           | ${false}
        ${1}      | ${3}      | ${[1]}          | ${true}
        ${1}      | ${3}      | ${[1, 2]}       | ${true}
        ${1}      | ${3}      | ${[1, 2, 3]}    | ${true}
        ${1}      | ${3}      | ${[1, 2, 3, 4]} | ${false}
    `(
        'arrayOf(number()).minLength($minLength).maxLength($maxLength).validate($input)',
        ({ minLength, maxLength, input, result }) => {
            expect(
                g
                    .arrayOf(g.number())
                    .minLength(minLength)
                    .maxLength(maxLength)
                    .validate(input)
            ).toBe(result);
        }
    );

    it('maxLength should always consider stronger restriction', () => {
        const guard1 = g
            .arrayOf(g.number())
            .maxLength(1)
            .maxLength(2);

        expect(guard1.validate([1])).toBe(true);
        expect(guard1.validate([1, 2])).toBe(false);

        const guard2 = g
            .arrayOf(g.number())
            .maxLength(2)
            .maxLength(1);

        expect(guard2.validate([1])).toBe(true);
        expect(guard2.validate([1, 2])).toBe(false);
    });

    it('minLength should always consider stronger restriction', () => {
        const guard1 = g
            .arrayOf(g.number())
            .minLength(1)
            .minLength(2);

        expect(guard1.validate([1])).toBe(false);
        expect(guard1.validate([1, 2])).toBe(true);

        const guard2 = g
            .arrayOf(g.number())
            .minLength(2)
            .minLength(1);

        expect(guard2.validate([1])).toBe(false);
        expect(guard2.validate([1, 2])).toBe(true);
    });

    it('should not set a diagnostic when validation succeeds', () => {
        const guard = g.arrayOf(g.string());
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate(['test'], diagnostic)).toBe(true);
        expect(diagnostic.error).toBeUndefined();
    });

    it('should set a diagnostic when validation fails', () => {
        const guard = g.arrayOf(g.string());
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate([1], diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
