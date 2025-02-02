import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        plugins: [terser()]
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].mjs',
        plugins: [terser()]
      },
    ],
    plugins: [typescript({ module: "ESNext" })]
  }
]

