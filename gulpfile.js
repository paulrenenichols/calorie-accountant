var gulp = require('gulp'),
    jade = require('gulp-jade'),
    run = require('gulp-run'),
    util = require('gulp-util'),
    clean = require('gulp-clean');

gulp.task('build-server', ['build-clean'], function () {
  return gulp.src('source/server/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('build-frontend-index', ['build-server'], function () {
  
  return gulp.src('source/frontend/html/index.jade')
    .pipe(jade({
      pretty: true,
      locals: {
        title: "Hello World"
      }
    }))
    .pipe(gulp.dest('build/public'))

});

gulp.task('build-frontend-vendor', ['build-server'], function () {
  
  return gulp.src('source/frontend/vendor/**/*')
    .pipe(gulp.dest('build/public/vendor'));

});

gulp.task('build-frontend-js', ['build-server'], function () {
  
  return gulp.src('source/frontend/js/**/*')
    .pipe(gulp.dest('build/public/js'));

});

gulp.task('build-frontend', ['build-frontend-index', 'build-frontend-js', 'build-frontend-vendor']);

gulp.task('build-install', ['build-frontend'], function (cb) {
  run('cd build && npm install').exec(function (err) {
    if (err) {
      util.log('An error occurred while attempting "build-install" task', err);
      cb(err);
    }
    else {
      cb();
    }
  });
})

gulp.task('build-clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
})

gulp.task('build', ['build-clean', 'build-server', 'build-frontend', 'build-install'], function (cb) {
  cb();
});

gulp.task('run', ['build'], function () {
  return run('cd build && npm start').exec(function (err) {
    if (err) {
      util.log('An error occurred while attempting "run" task', err);
    }
    else {
      util.log('run complete');
    }
  });
});

gulp.task('develop', ['build', 'run']);