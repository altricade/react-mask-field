const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;
const { defineConfig } = require('rollup');
const terser = require('@rollup/plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const packageJson = require('./package.json');

module.exports = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        sourcemap: true,
        name: 'ReactMaskField',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        plugins: [terser()],
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
        outputToFilesystem: true,
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]);
