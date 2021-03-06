const mix = require('laravel-mix');

/*
 | js を import するときに、/resources/js 起点の絶対パスで表記できるようにする
 */
mix.webpackConfig({
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': __dirname + '/resources/js'
    }
  },
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/user.js', 'public/js')
    .react()
    .sass('resources/sass/user.scss', 'public/css');
