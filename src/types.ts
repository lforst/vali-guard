export type ValidatableType<V> = V extends Validatable<infer T> ? T : never;

export interface Validatable<T> {
    validate: (subject: unknown) => subject is T;
}
