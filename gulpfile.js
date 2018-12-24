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
const runSequence = require('run-sequence');

gulp.task('useref', () => {
    return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
  });

  gulp.task('images', () => {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
  });

  gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
  });

  gulp.task('clean:dist', () => {
    return del.sync('dist');
  });

gulp.task('browserSync', () => {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
  });

gulp.task('sass', () =>{
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream:true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], () =>{
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload); 
    gulp.watch('src/js/**/*.js', browserSync.reload); 
    //other glup watch functions can go here 
});

gulp.task('build',  (callback) => {
    runSequence('clean:dist', 
      ['sass', 'useref', 'images', 'fonts'],
      callback
    )
  })

  gulp.task('default', (callback) => {
    runSequence(['sass','browserSync', 'watch'],
      callback
    )
  })