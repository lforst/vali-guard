import guard from '../../src/index';

const input: unknown = Symbol();

if (
    guard
        .object({
            type: guard.string(),
            a: guard.number()
        })
        .or(
            guard.object({
                type: guard.number(),
                b: guard.number()
            })
        )
        .validate(input)
) {
    input.type;
}
