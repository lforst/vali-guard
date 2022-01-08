export type ValidatableType<V> = V extends Validatable<infer T> ? T : never;

export interface Validatable<T> {
    validate: (subject: unknown) => subject is T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatableRecord = { [Key in any]: Validatable<unknown> };
