var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/css/*.css', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});






