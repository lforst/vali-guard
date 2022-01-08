import { Validatable } from '../types';

export default class UndefinedValidator implements Validatable<undefined> {
    validate(subject: unknown): subject is undefined {
        return typeof subject === 'undefined';
    }
}
