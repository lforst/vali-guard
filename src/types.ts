export type ValidatableType<V> = V extends Validatable<infer T> ? T : never;

export type ValidationDiagnostics = {
    /**
     * Gives an informal reason why the validation failed. Application logic
     * should not depend on the contents of this field as it may change across
     * minor versions.
     */
    error?: string;
};

export interface Validatable<T> {
    validate: (subject: unknown, diagnostics?: ValidationDiagnostics) => subject is T;
}

export type Primitive = string | number | boolean | undefined | null | symbol | bigint;
