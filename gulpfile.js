var gulp = require('gulp');
//Plugin for preprocessing sass
var sass = require('gulp-sass');

gulp.task('sass', () =>{
    return gulp.src('src/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('init', () => {
    console.log("starting build");
});