var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    run = require('gulp-run'),
    util = require('gulp-util'),
    debug = require('gulp-debug'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    nodeUtil = require('util'),
    through2 = require('through2'),
    npm = require('npm'),
    _ = require('lodash');

var buildPackageJson = require('./source/server/package.json');

var consoleStream = through2.obj(function(file, encoding, cb) {
  //console.log(JSON.stringify(file, null, 2));
  file.contents.pipe(process.stdout);

  this.push(file);
  cb();
});


var karma = require('karma').server;

var buildConfig = {
  
  frontend: {
    index: {
      src: 'source/frontend/html/index.jade',
      dest: 'build/public'
    },
    templates: {
      src: 'source/frontend/html/templates/**/*.jade',
      dest: 'build/public/templates'
    },
    js: {
      project: {
        src: 'source/frontend/js/**/*.js',
        dest: 'build/public/js'
      },
      test: {
        src: 'test/frontend/**/*.js',
        dest: null
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

gulp.task('lint-frontend', function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

});

gulp.task('lint-server', function () {
  
  return gulp.src('source/server/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

});


// Test tasks

gulp.task('test-frontend', ['lint-frontend'], function (done) {
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
    .pipe(sass())
    .pipe(gulp.dest(buildConfig.frontend.css.project.dest));

});

gulp.task('build-frontend-index-html', ['test-frontend'], function () {
  
  return gulp.src(buildConfig.frontend.index.src)
    .pipe(jade({
      pretty: true,
      locals: {
        title: "Calorie Accountant"
      }
    }))
    .pipe(gulp.dest(buildConfig.frontend.index.dest));

});

gulp.task('build-frontend-templates-html', ['test-frontend'], function () {
  
  return gulp.src(buildConfig.frontend.templates.src)
    .pipe(jade({
      pretty: true,
      locals: {}
    }))
    .pipe(gulp.dest(buildConfig.frontend.templates.dest));

});

gulp.task('build-frontend-js-vendor', function () {
  
  return gulp.src(buildConfig.frontend.js.vendor.src)
    .pipe(gulp.dest(buildConfig.frontend.js.vendor.dest));

});

gulp.task('build-frontend-js-project-lint', ['test-frontend'], function () {
  
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

gulp.task('build-frontend', ['build-frontend-index-html', 'build-frontend-templates-html', 'build-frontend-js-project', 'build-frontend-js-vendor', 'build-frontend-css'], function(done) { done(); });


gulp.task('server-build-install', ['build-server'], function (cb) {
  var buildPackageJsonWithPrefix = {
    prefix: 'build'
  };

  _.merge(buildPackageJsonWithPrefix, buildPackageJson);

  npm.load(buildPackageJsonWithPrefix, function () {
    npm.commands.install(function (error) {
      if (error) {
        cb(error);
      }
      else {
        cb();
      }
    });
  });
})


gulp.task('run', function (cb) {
 
  var runDirectoryPrefix = {
    prefix: 'build'
  };

  _.merge(runDirectoryPrefix, buildPackageJson);

  npm.load(runDirectoryPrefix, function () {
    npm.commands.start(function (error) {
      if (error) {
        cb(error);
      }
      else {
        cb();
      }
    });
  });
});

gulp.task('stop', function (cb) {
 
  var runDirectoryPrefix = {
    prefix: 'build'
  };

  _.merge(runDirectoryPrefix, buildPackageJson);

  npm.load(runDirectoryPrefix, function () {
    npm.commands.stop(function (error) {
      if (error) {
        cb(error);
      }
      else {
        cb();
      }
    });
  });
});

gulp.task('watch-frontend', ['build-frontend'], function () {
  gulp.watch([buildConfig.frontend.js.project.src,
              buildConfig.frontend.js.test.src,
              buildConfig.frontend.index.src,
              buildConfig.frontend.css.project.src], ['build-frontend']);
});


