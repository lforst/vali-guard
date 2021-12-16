import guard from '../../dist';

const input: unknown = 'asdf';

const definition = guard.string().nullable();

if (definition.validate(input)) {
    type asdf = typeof input;
}
