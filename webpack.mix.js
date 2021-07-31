const mix = require('laravel-mix');

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

mix.js('resources/js/app.js', 'public/js')
.sass('resources/sass/app.scss', 'public/css')
.sass('resources/sass/shared.scss', 'public/css')
.sass('resources/sass/user.scss','public/css/user')
.sass('resources/sass/admin.scss','public/css/admin')
.js('resources/js/user/index.js', 'public/js/user')
.js('resources/js/admin/index.js', 'public/js/admin')
.react()
.browserSync('team-zone.localhost')
