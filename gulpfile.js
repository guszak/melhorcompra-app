var gulp = require('gulp')
var concat = require('gulp-concat')
var cleanCss = require('gulp-clean-css')
var rev = require('gulp-rev')
var uglify = require('gulp-uglify')
var inject = require('gulp-inject')
var del = require('del')
var pump = require('pump')
var sourcemaps = require('gulp-sourcemaps')
var series = require('stream-series')
var gulpNgConfig = require('gulp-ng-config')
var runSequence = require('run-sequence')

gulp.task('ng-config', function () {
  gulp.src('config.json')
  .pipe(gulpNgConfig('app.config'))
  .pipe(gulp.dest('./public/scripts'))
})

gulp.task('clean-vendor-css', function () {
  return del([
    'dist/vendor*.css'
  ])
})
gulp.task('clean-app-css', function () {
  return del([
    'dist/app*.css'
  ])
})
gulp.task('clean-vendor-js', function () {
  return del([
    'dist/vendor*.js'
  ])
})
gulp.task('clean-app-js', function () {
  return del([
    'dist/app*.js'
  ])
})
gulp.task('clean-vendor-map', function () {
  return del([
    'dist/vendor*.map'
  ])
})
gulp.task('clean-app-map', function () {
  return del([
    'dist/app*.map'
  ])
})

gulp.task('pack-vendor-css', ['clean-vendor-css'], function () {
  return gulp.src([
    'node_modules/angular-material/angular-material.min.css',
    'node_modules/angular-material-data-table/dist/md-data-table.min.css',
    'node_modules/angular-ui-notification/dist/angular-ui-notification.min.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(cleanCss({
    format: {
      wrapAt: 500
    }
  }))
  .pipe(rev())
  .pipe(gulp.dest('./dist'))
})

gulp.task('pack-app-css', ['clean-app-css'], function () {
  return gulp.src(['public/styles/*.css'])
  .pipe(concat('app.css'))
  .pipe(cleanCss({
    format: {
      wrapAt: 500
    }
  }))
  .pipe(rev())
  .pipe(gulp.dest('./dist'))
})

gulp.task('pack-vendor-js', ['clean-vendor-js', 'clean-vendor-map'], function () {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-material/angular-material.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-i18n/angular-locale_pt-br.js',
    'node_modules/angular-material-data-table/dist/md-data-table.min.js',
    'node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
    'node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
    'node_modules/chart.js/dist/Chart.min.js',
		'node_modules/angular-chart.js/dist/angular-chart.min.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('vendor.js'))
  .pipe(uglify({
    mangle: false,
    preserveComments: 'license',
    compress: false,
    output: {
      max_line_len: 500
    }
  }))
  .pipe(rev())
  .pipe(sourcemaps.write('../dist'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('pack-app-js', ['clean-app-js', 'clean-app-map'], function () {
  return pump([

    gulp.src(['./public/scripts/*.js', './public/components/**/*.js']),
    sourcemaps.init(),
    concat('app.js'),
    uglify({
      mangle: false,
      preserveComments: 'license',
      compress: false,
      output: {
        max_line_len: 500
      }
    }),
    rev(),
    sourcemaps.write('../dist'),
    gulp.dest('./dist')

  ])
})

gulp.task('inject', function () {
  var vendorCss = gulp.src('./dist/vendor*.css')
  var appCss = gulp.src('./dist/app*.css')
  var vendorJs = gulp.src('./dist/vendor*.js')
  var appJs = gulp.src('./dist/app*.js')

  return gulp.src('./public/index.html')
  .pipe(inject(series(vendorCss, appCss, vendorJs, appJs), { addRootSlash: false }))
  .pipe(gulp.dest('./'))
})

gulp.task('pack-app-css-inject', function () {
  runSequence('pack-app-css', 'inject')
})

gulp.task('pack-app-js-inject', function () {
  runSequence('pack-app-js', 'inject')
})

gulp.task('watch', function () {
  gulp.watch('./public/styles/*.css', ['pack-app-css-inject'])
  gulp.watch('./public/**/*.js', ['pack-app-js-inject'])
})

gulp.task('deploy', function () {
  runSequence('ng-config', 'pack-vendor-css', 'pack-app-css', 'pack-vendor-js', 'pack-app-js', 'inject')
})

gulp.task('default', function () {
  runSequence('ng-config', 'pack-vendor-css', 'pack-app-css', 'pack-vendor-js', 'pack-app-js', 'inject', 'watch')
})
