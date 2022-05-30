// Rollup plugins
// import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
// import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import replace from 'rollup-plugin-replace';
// import uglify from 'rollup-plugin-uglify';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'scripts/src/script.js',
    plugins: [commonjs()],
    output: [
      {
        file: 'scripts/script.js',
        format: 'iife',
        name: 'bundle',
        sourcemap: false
      },
      {
        file: 'scripts/script.min.js',
        format: 'iife',
        name: 'compressed',
        sourcemap: false,
        plugins: [terser()]
      },
    ]
  }
];