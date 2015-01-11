var gulp = require('gulp'),
    jade = require('gulp-jade'),
    run = require('gulp-run'),
    util = require('gulp-util'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint');

var karma = require('karma').server;

var buildConfig = {
  
  frontend: {
    index: {
      src: 'source/frontend/html/index.jade',
      dest: 'build/public'
    },
    js: {
      project: {
        src: 'source/frontend/js/**/*',
        dest: 'build/public/js'
      },
      vendor: {
        src: 'source/frontend/vendor/js/development/**/*',
        dest: 'build/public/vendor/js'
      }
    },
    test: {
      karmaConfigPath: '/test/karma.conf.js'
    }
  }
};


// Lint tasks

gulp.task('lint-frontend-js-project', function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default', { 
      verbose: true,
      browser: true
    }))
    .pipe(jshint.reporter('fail'));

});

gulp.task('lint', ['lint-frontend-js-project']);

// Test tasks

gulp.task('test-dependencies', ['lint']);

gulp.task('test-frontend-js-project', ['test-dependencies'], function (done) {
  karma.start({
    configFile: __dirname + buildConfig.frontend.test.karmaConfigPath,
    singleRun: true
  }, done);
});

gulp.task('test', ['test-frontend-js-project']);

// Build Clean Task

gulp.task('build-dependencies', ['test']);

gulp.task('build-clean', ['build-dependencies'], function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
})

// Server Build Tasks

gulp.task('build-server', ['build-clean'], function () {
  return gulp.src('source/server/**/*')
    .pipe(gulp.dest('build'));
});

// Frontend Build Tasks

gulp.task('build-frontend-index-html', ['build-server'], function () {
  
  return gulp.src(buildConfig.frontend.index.src)
    .pipe(jade({
      pretty: true,
      locals: {
        title: "Hello World"
      }
    }))
    .pipe(gulp.dest(buildConfig.frontend.index.dest))

});

gulp.task('build-frontend-js-vendor', ['build-server'], function () {
  
  return gulp.src(buildConfig.frontend.js.vendor.src)
    .pipe(gulp.dest(buildConfig.frontend.js.vendor.dest));

});

gulp.task('build-frontend-js-project-lint', function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default', { 
      verbose: true,
      browser: true
    }))
    .pipe(jshint.reporter('fail'));

});

gulp.task('build-frontend-js-project', ['build-server'], function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(gulp.dest(buildConfig.frontend.js.project.dest));

});

gulp.task('build-frontend', ['build-frontend-index-html', 'build-frontend-js-project', 'build-frontend-js-vendor']);


gulp.task('build-install', ['build-frontend'], function (cb) {
  run('cd build && npm install > /dev/null').exec(function (err) {
    if (err) {
      util.log('An error occurred while attempting "build-install" task', err);
      cb(err);
    }
    else {
      cb();
    }
  });
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