const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('rollup-plugin-glob-import');
const babel = require('rollup-plugin-babel');
const deindent = require('deindent');
const { terser } = require('rollup-plugin-terser');
const serve = require('rollup-plugin-serve');
const copy = require('rollup-plugin-copy-assets-to');

const { name, contributors, version, browserslist } = require('./package.json');

module.exports = function({ minified, es6, coverage, tests, server }) {
  return {
    input: server ? 'demo/index.ts' : 'src/auth0.ts',
    external: tests || server ? [] : ['@salte-auth/salte-auth'],
    output: {
      file: `dist/auth0${minified ? '.min' : ''}.${es6 ? 'mjs' : 'js'}`,
      format: es6 ? 'es' : 'umd',
      name: 'salte.auth.auth0',
      sourcemap: tests ? 'inline' : true,
      exports: 'named',
      banner: deindent`
        /**
         * ${name} JavaScript Library v${version}
         *
         * @license MIT (https://github.com/salte-auth/auth0/blob/master/LICENSE)
         *
         * Made with ♥ by ${contributors.join(', ')}
         */
      `,
      globals: {
        '@salte-auth/salte-auth': 'salte.auth'
      }
    },

    plugins: [
      resolve({
        module: false,
        browser: true,

        extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts' ]
      }),

      commonjs({
        namedExports: {
          'chai': [ 'expect' ],
          '@salte-auth/salte-auth': ['SalteAuth', 'SalteAuthError', 'OAuth2Provider', 'OpenIDProvider', 'Handler', 'Utils', 'Generic']
        }
      }),
      glob(),

      babel({
        presets: [
          '@babel/typescript',
          ['@babel/preset-env', {
            targets: es6 ? {
              esmodules: true
            } : {
              browsers: browserslist
            }
          }]
        ],

        plugins: coverage ? [['istanbul', {
          include: [
            'src/**/*.ts'
          ]
        }]] : [],

        exclude: 'node_modules/!(chai|sinon)/**',
        extensions: [".ts", ".js", ".jsx", ".es6", ".es", ".mjs"]
      }),

      minified && terser({
        output: {
          comments: function (node, comment) {
            const { value, type } = comment;
            if (type == 'comment2') {
              // multiline comment
              return /@license/i.test(value);
            }
          }
        }
      }),

      server && copy({
        assets: [
          './demo/index.html'
        ],
        outputDir: 'dist'
      }),

      server && serve({
        contentBase: 'dist',
        historyApiFallback: '/index.html',
        port: 8081
      })
    ],

    watch: {
      include: '**',
      exclude: 'node_modules/**'
    },

    onwarn: function(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    }
  }
}
