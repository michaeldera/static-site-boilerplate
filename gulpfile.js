const { src, dest, series, parallel, watch } = require(gulp);

const gulp = require('gulp');
//Plugin for preprocessing sass
const sass = require('gulp-sass');
//Browser sync for live-reloading 
const browserSync = require('browser-sync').create();

const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');


function useref() {
  return src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(dest('dist'));
}

function optimiseImages() {
  return src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(dest('dist/images'))
}

function moveFonts() {
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts'))
}

function clean(){
      return del.sync('dist');
}

function liveReload( callback){
    browserSync.init({server: { baseDir: 'dist' }});
    callback();
}

function cssTranspile() {
  return src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
}

function watchChanges(callback){
  watch(['src/scss/**/*.scss', 'src/*.html', 'src/js/**/*.js' ], build);
  callback();
}
function build(callback){
  series( clean, parallel(cssTranspile, moveFonts, optimiseImages, useref));
  callback();
}

exports.build = build;
exports.default = series( build, liveReload, watchChanges);
