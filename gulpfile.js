var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    run = require('gulp-run'),
    util = require('gulp-util'),
    debug = require('gulp-debug'),
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
        src: 'source/frontend/js/**/*.js',
        dest: 'build/public/js'
      },
      vendor: {
        src: 'source/frontend/vendor/js/development/**/*.js',
        dest: 'build/public/vendor/js'
      }
    },
    css: {
      project: {
        src: 'source/frontend/css/**/*.sass',
        dest: 'build/public/css/'
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


// Test tasks

gulp.task('test-frontend-js-project', ['lint-frontend-js-project'], function (done) {
  karma.start({
    configFile: __dirname + buildConfig.frontend.test.karmaConfigPath,
    singleRun: true
  }, done);
});


// Build Clean Task

gulp.task('build-clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
})

// Server Build Tasks

gulp.task('build-server', ['build-clean'], function () {
  return gulp.src('source/server/**/*')
    .pipe(gulp.dest('build'));
});

// Frontend Build Tasks

gulp.task('build-frontend-css', function () {

  util.log(buildConfig.frontend.css.project.src);
  util.log(buildConfig.frontend.css.project.dest);
  return gulp.src(buildConfig.frontend.css.project.src)
    .pipe(debug({
      title: 'css-before'
    }))
    .pipe(sass())
    .pipe(debug({
      title: 'css-after'
    }))
    .pipe(gulp.dest(buildConfig.frontend.css.project.dest));

});

gulp.task('build-frontend-index-html', function () {
  
  return gulp.src(buildConfig.frontend.index.src)
    .pipe(jade({
      pretty: true,
      locals: {
        title: "Hello World"
      }
    }))
    .pipe(debug({
      title: 'html-after'
    }))
    .pipe(gulp.dest(buildConfig.frontend.index.dest))

});

gulp.task('build-frontend-js-vendor', function () {
  
  return gulp.src(buildConfig.frontend.js.vendor.src)
    .pipe(gulp.dest(buildConfig.frontend.js.vendor.dest));

});

gulp.task('build-frontend-js-project-lint', ['test-frontend-js-project'], function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default', { 
      verbose: true,
      browser: true
    }))
    .pipe(jshint.reporter('fail'));

});

gulp.task('build-frontend-js-project', function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(gulp.dest(buildConfig.frontend.js.project.dest));

});

gulp.task('build-frontend', ['build-frontend-index-html', 'build-frontend-js-project', 'build-frontend-js-vendor', 'build-frontend-css'], function(done) { done(); });


gulp.task('server-build-install', ['build-server'], function (cb) {
  run('cd build && npm install & > /dev/null').exec(function (err) {
    if (err) {
      util.log('An error occurred while attempting "build-install" task', err);
      cb(err);
    }
    else {
      cb();
    }
  });
})


gulp.task('run', function () {
  return run('cd build && npm start').exec(function (err) {
    if (err) {
      util.log('An error occurred while attempting "run" task', err);
    }
    else {
      util.log('run complete');
    }
  });
});

gulp.task('watch-frontend', ['build-frontend'], function () {
  gulp.watch([buildConfig.frontend.js.project.src,
              buildConfig.frontend.index.src,
              buildConfig.frontend.css.project.src], ['build-frontend']);
});


