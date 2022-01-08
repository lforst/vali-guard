import { Validatable } from '../types';

export default class NullValidator implements Validatable<null> {
    validate(subject: unknown): subject is null {
        return subject === null;
    }
}
