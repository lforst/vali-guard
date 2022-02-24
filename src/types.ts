export type ValidatableType<V> = V extends Validatable<infer T> ? T : never;

export type ValidationDiagnostics = {
    /**
     * Gives an informal reason why the validation failed. Application logic
     * should not depend on the contents of this field as it may change across
     * minor versions.
     */
    error?: string;
    /**
     * Indicates where in the subject the validation failed (only for object
     * and array validators).
     */
    // fieldPath?: string;
};

export interface Validatable<T> {
    validate: (subject: unknown, diagnostics?: ValidationDiagnostics) => subject is T;
}
