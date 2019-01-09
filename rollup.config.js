import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';


export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        resolve({ customResolveOptions: { moduleDirectory: 'node_modules' } }),
        babel({ exclude: 'node_modules/**' }),
        json(),
        commonjs()
    ],
    external: [],
};
