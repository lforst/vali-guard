import * as guard from '../../src';

describe('DisjunctiveValidator', () => {
    it.each`
        v1                | t1            | v2                | t2            | input            | result
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${'some string'} | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${42}            | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${null}          | ${false}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${undefined}     | ${false}
        ${guard.string()} | ${'string()'} | ${guard.string()} | ${'string()'} | ${'some string'} | ${true}
        ${guard.string()} | ${'string()'} | ${guard.string()} | ${'string()'} | ${42}            | ${false}
    `('oneOf($t1, $t2).validate($input)', ({ v1, v2, input, result }) => {
        expect(guard.oneOf(v1, v2).validate(input)).toBe(result);
    });

    it.each`
        v1                | t1            | v2                | t2            | v3             | t3         | input            | result
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${guard.nil()} | ${'nil()'} | ${'some string'} | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${guard.nil()} | ${'nil()'} | ${42}            | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${guard.nil()} | ${'nil()'} | ${null}          | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${guard.nil()} | ${'nil()'} | ${undefined}     | ${false}
    `('oneOf($t1, $t2, $t3).validate($input)', ({ v1, v2, v3, input, result }) => {
        expect(guard.oneOf(v1, v2, v3).validate(input)).toBe(result);
    });

    it.each`
        v1                | t1            | v2                | t2            | input            | result
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${'some string'} | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${42}            | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${null}          | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${undefined}     | ${false}
    `('oneOf($t1, $t2).nullable().validate($input)', ({ v1, v2, input, result }) => {
        expect(
            guard
                .oneOf(v1, v2)
                .nullable()
                .validate(input)
        ).toBe(result);
    });

    it.each`
        v1                | t1            | v2                | t2            | input            | result
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${'some string'} | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${42}            | ${true}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${null}          | ${false}
        ${guard.string()} | ${'string()'} | ${guard.number()} | ${'number()'} | ${undefined}     | ${true}
    `('oneOf($t1, $t2).optional().validate($input)', ({ v1, v2, input, result }) => {
        expect(
            guard
                .oneOf(v1, v2)
                .optional()
                .validate(input)
        ).toBe(result);
    });
});
