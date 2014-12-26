var gulp = require('gulp'),
    jade = require('gulp-jade'),
    run = require('gulp-run');

gulp.task('build-server', function () {
  gulp.src('source/server/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('build-frontend', function () {
  
  gulp.src('source/frontend/vendor/**/*')
    .pipe(gulp.dest('build/public/vendor'));

  gulp.src('source/frontend/js/**/*')
    .pipe(gulp.dest('build/public/js'));

  gulp.src('source/frontend/html/index.jade')
    .pipe(jade({
      pretty: true,
      locals: {
        title: "Hello World"
      }
    }))
    .pipe(gulp.dest('build/public'))

});

gulp.task('build', ['build-server', 'build-frontend'])

gulp.task('run', function () {
  run('cd build && npm start').exec();
});

gulp.task('develop', ['build', 'run']);