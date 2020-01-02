import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

module.exports = [
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: [
      'jszip'
    ],
    plugins: [
      babel(),
      commonjs()
    ]
  },
  {
    input: 'lib/index.js',
    output: {
      file: 'es/index.js',
      format: 'esm',
    },
    external: [
      'jszip'
    ],
    plugins: [
      babel(),
      commonjs()
    ]
  }
];
