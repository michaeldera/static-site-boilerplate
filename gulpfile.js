var gulp = require('gulp');
//Plugin for preprocessing sass
var sass = require('gulp-sass');

gulp.task('sass', () =>{
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('init', () => {
    console.log("starting build");
});

gulp.task('watch', () =>{
    gulp.watch('src/scss/**/*.scss', ['sass']);
    //other glup watch functions can go here 
});