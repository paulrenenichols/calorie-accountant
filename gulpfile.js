var gulp = require('gulp'),
    jade = require('gulp-jade'),
    run = require('gulp-run');

gulp.task('build-server', function () {
  gulp.src('source/server/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('build-frontend', function () {
  gulp.src('source/frontend/html/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build/public'))
});

gulp.task('build', ['build-server', 'build-frontend'])

gulp.task('run', function () {
  run('cd build && npm start').exec();
});