import * as g from '../../src';
import { NonDiagnosingValidator } from './utils/non-diagnosing-validator';

describe('BaseValidator', () => {
    it('optional() should set a diagnostic containing the diagnostic of the underlying validator on failed validation', () => {
        const underlyingGuard = g.string();
        const underlyingDiagnostic: g.ValidationDiagnostics = {};

        expect(underlyingGuard.validate(1, underlyingDiagnostic)).toBe(false);
        expect(underlyingDiagnostic.error).toBeDefined();

        const optionalGuard = underlyingGuard.optional();
        const optionalDiagnostic: g.ValidationDiagnostics = {};

        expect(optionalGuard.validate(1, optionalDiagnostic)).toBe(false);
        expect(optionalDiagnostic.error).toContain(underlyingDiagnostic.error);
    });

    it('nullable() should set a diagnostic containing the diagnostic of the underlying validator on failed validation', () => {
        const underlyingGuard = g.string();
        const underlyingDiagnostic: g.ValidationDiagnostics = {};

        expect(underlyingGuard.validate(1, underlyingDiagnostic)).toBe(false);
        expect(underlyingDiagnostic.error).toBeDefined();

        const optionalGuard = underlyingGuard.nullable();
        const optionalDiagnostic: g.ValidationDiagnostics = {};

        expect(optionalGuard.validate(1, optionalDiagnostic)).toBe(false);
        expect(optionalDiagnostic.error).toContain(underlyingDiagnostic.error);
    });

    it('optional() should still set a diagnostic when the underlying validator does not set a diagnostic on failed validation', () => {
        const guard = new NonDiagnosingValidator().optional();
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('anything', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });

    it('nullable() should still set a diagnostic when the underlying validator does not set a diagnostic on failed validation', () => {
        const guard = new NonDiagnosingValidator().nullable();
        const diagnostic: g.ValidationDiagnostics = {};

        expect(guard.validate('anything', diagnostic)).toBe(false);
        expect(diagnostic.error).toBeDefined();
    });
});
