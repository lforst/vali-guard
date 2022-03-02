import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/tests/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: ['node_modules/', 'dist/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.{ts,js,tsx,jsx}'],
    coverageReporters: ['json', 'text'],
};

export default config;
