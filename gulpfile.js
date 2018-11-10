var gulp = require('gulp');
//Plugin for preprocessing sass
var sass = require('gulp-sass');
//Browser sync for live-reloading 
var browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
  });


gulp.task('sass', () =>{
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
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

