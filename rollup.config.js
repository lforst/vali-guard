import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import packageJson from './package.json';

const input = ['src/index.ts'];

const extensions = ['.js', '.ts'];

export default [
    // UMD
    {
        input,
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babel({
                extensions,
                babelHelpers: 'bundled',
                include: ['src/**/*'],
            }),
            terser(),
        ],
        output: {
            file: `dist/umd/${packageJson.name}.min.js`,
            format: 'umd',
            name: 'ValiGuard',
            esModule: false,
            exports: 'named',
            sourcemap: true,
        },
    },

    // ESM and CJS
    {
        input,
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babel({
                extensions,
                babelHelpers: 'bundled',
                include: ['src/**/*'],
            }),
        ],
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                exports: 'named',
                sourcemap: true,
            },
            {
                file: packageJson.main,
                format: 'cjs',
                exports: 'named',
                sourcemap: true,
            },
        ],
    },
];
