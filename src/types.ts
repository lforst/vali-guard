type ValidatorType<V> = V extends IValidator<infer T> ? T : never;

interface IValidator<T> {
    validate: (subject: unknown) => subject is T;
    or<B>(validator: IValidator<B>): IValidator<T | B>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidationRecord = { [Key in any]: IValidator<unknown> };

export { IValidator, ValidationRecord, ValidatorType };
