// modules
const gulp = require('gulp');
// const gutil = require('gulp-util');
const concat = require('gulp-concat');
// const rename = require('gulp-rename');
// https://github.com/postcss/autoprefixer#options
const autoprefixer = require('gulp-autoprefixer');

const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const terser = require('rollup-plugin-terser').terser;

const sass = require('gulp-sass')(require('sass'));

// -----------------------------------------------------------------
// functions

function getSrc(paths, exp = '') {
  var src = []
  for (var key in paths) {
      var dir = paths[key];
      src.push(dir + '*.' + exp);
  }
  return src;
}

// -----------------------------------------------------------------
// variables

const cssPaths = [
  './styles/src/'
]
const jsPaths = [
  './scripts/src/'
]
var sassFiles = getSrc(cssPaths, 'scss');
var scriptFiles = getSrc(jsPaths, 'js');

// -----------------------------------------------------------------
// gulp tasks

// gulp css
gulp.task('css', async()=>{
  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions']}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./styles/'));
});
// gulp js
gulp.task('js', async function () {
  const bundle = await rollup.rollup({
    input: 'scripts/src/main.js',
    plugins: [commonjs()]
  });
  bundle.write({
    file: 'scripts/script.js',
    format: 'iife',
    name: 'bundle',
    sourcemap: false,
  });
});
// gulp css-min
gulp.task('css-min', async()=>{
  return gulp.src(sassFiles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions']}))
    .pipe(concat('style.min.css'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./styles/'));
});
// gulp js-min
gulp.task('js-min', async function () {
  const bundle = await rollup.rollup({
    input: 'scripts/src/script.js',
    plugins: [commonjs()]
  });
  bundle.write({
    file: 'scripts/script.min.js',
    format: 'iife',
    name: 'compressed',
    sourcemap: false,
    plugins: [terser()]
  });
});

// -----------------------------------------------------------------
// gulp process

// gulp watch
// https://programmingsummaries.tistory.com/393
gulp.task('watch', function () {
  gulp.watch(sassFiles, gulp.series('css'));
  gulp.watch(scriptFiles, gulp.series('js'));
});
// gulp build
gulp.task('build', async function () {
  gulp.parallel(
    'css', 'css-min', 
    'js', 'js-min'
  )();
});
