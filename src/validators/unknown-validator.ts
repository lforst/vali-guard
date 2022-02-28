import { Validatable } from '../types';

export class UnknownValidator implements Validatable<unknown> {
    validate(_: unknown): _ is unknown {
        return true;
    }
}
