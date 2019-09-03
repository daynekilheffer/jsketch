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
      require('rollup-plugin-babel')(),
      require('rollup-plugin-commonjs')()
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
      require('rollup-plugin-babel')(),
      require('rollup-plugin-commonjs')()
    ]
  }
];
