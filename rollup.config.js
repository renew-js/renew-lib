import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';


export default {
    input: 'index.js',
    output: {
        file: 'dist/renew-lib.js',
        name: 'Drawing',
        format: 'cjs',
    },
    plugins: [
        resolve({ customResolveOptions: { moduleDirectory: 'node_modules' } }),
        babel({ exclude: 'node_modules/**' }),
        json(),
        commonjs(),
        uglify(),
    ],
    external: [],
};
