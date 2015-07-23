var parseArgs = require('minimist'),
    gulp = require('gulp'),
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
    _ = require('lodash'),
    mocha = require('gulp-mocha');

var buildPackageJson = require('./source/server/package.json');

var projectPackageJson = require('./package.json');

var consoleStream = through2.obj(function(file, encoding, cb) {
  //console.log(JSON.stringify(file, null, 2));
  file.contents.pipe(process.stdout);

  this.push(file);
  cb();
});


var karma = require('karma').server;

var argv = parseArgs(process.argv.slice(2));

var appConfigFile = (argv['--appconfig'] || './appConfig.json')

var appConfig = require(appConfigFile);

var buildConfig = {
  
  frontend: {
    index: {
      src: 'source/frontend/html/index.jade',
      dest: 'build/public',
      title: "Calorie Accountant"
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
        src: 'source/frontend/css/**/*.scss',
        dest: 'build/public/css'
      },
      vendor: {
        src: 'source/frontend/vendor/css/**/*.scss'
      }
    },
    img: {
      src: 'source/frontend/img/**/*',
      dest: 'build/public/img'
    },
    test: {
      karmaConfigPath: '/test/karma.conf.js'
    }
  },

  server: {
    js: {
      src: 'source/server/**/*.js'
    },
    test: {
      src: 'test/server/**/*.js'
    },
    all: 'source/server/**/*'
  }
};



/*
 *
 *  Server Tasks
 *
 */

// jsHint task for server code
gulp.task('lint-server', function () {
  
  return gulp.src(buildConfig.server.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

});

// mocha tests for server
gulp.task('test-server', ['lint-server'], function (done) {
  return gulp.src(buildConfig.server.test.src, {read: false})
          .pipe(mocha({reporter: 'spec'}));
});

// Task that removes build folder
gulp.task('build-clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
})

// Task that copies server files into build directory
gulp.task('build-server', ['build-clean', 'test-server'], function () {
  return gulp.src(buildConfig.server.all)
    .pipe(gulp.dest('build'));
});

gulp.task('build-server-config', ['build-clean'], function () {
  return gulp.src(appConfigFile)
    .pipe(gulp.dest('build'));
});



/*
 *
 *  Frontend Tasks
 *
 */

// jsHint task for frontend code
gulp.task('lint-frontend', function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default', { 
      verbose: true,
      browser: true
    }))
    .pipe(jshint.reporter('fail'));

});

// karma-mocha tests for frontend
gulp.task('test-frontend', ['lint-frontend'], function (done) {
  karma.start({
    configFile: __dirname + buildConfig.frontend.test.karmaConfigPath,
    singleRun: true
  }, done);
});

// Frontend Build Tasks

gulp.task('build-frontend-copy-img', ['build-clean'], function () {
  return gulp.src(buildConfig.frontend.img.src)
    .pipe(gulp.dest(buildConfig.frontend.img.dest));
});

gulp.task('build-frontend-css', ['build-clean'], function () {

  util.log(buildConfig.frontend.css.project.src, buildConfig.frontend.css.vendor.src);
  util.log(buildConfig.frontend.css.project.dest);
  return gulp.src([buildConfig.frontend.css.vendor.src, buildConfig.frontend.css.project.src])
    .pipe(sass())
    .pipe(gulp.dest(buildConfig.frontend.css.project.dest));

});

gulp.task('build-frontend-index-html', ['build-clean'], function () {
  
  return gulp.src(buildConfig.frontend.index.src)
    .pipe(jade({
      pretty: true,
      locals: {
        title: buildConfig.frontend.index.title,
        apiUrl: appConfig.apiUrl
      }
    }))
    .pipe(gulp.dest(buildConfig.frontend.index.dest));

});

gulp.task('build-frontend-templates-html', ['build-clean'], function () {
  
  return gulp.src(buildConfig.frontend.templates.src)
    .pipe(jade({
      pretty: true,
      locals: {}
    }))
    .pipe(gulp.dest(buildConfig.frontend.templates.dest));

});

gulp.task('build-frontend-js-vendor', ['build-clean'], function () {
  
  return gulp.src(buildConfig.frontend.js.vendor.src)
    .pipe(gulp.dest(buildConfig.frontend.js.vendor.dest));

});

gulp.task('build-frontend-js-project', ['test-frontend', 'build-clean'], function () {
  
  return gulp.src(buildConfig.frontend.js.project.src)
    .pipe(gulp.dest(buildConfig.frontend.js.project.dest));

});

// Main frontend build task
gulp.task('build-frontend', ['build-frontend-index-html', 'build-frontend-templates-html', 'build-frontend-js-project', 'build-frontend-js-vendor', 'build-frontend-css', 'build-frontend-copy-img'], function(done) { done(); });

// Build all, don't npm install
gulp.task('build-all', ['build-frontend', 'build-server', 'build-server-config'], function(done) { done(); });


gulp.task('install', ['build-all'], function (cb) {
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


gulp.task('start', function (cb) {
 
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

gulp.task('watch-frontend', ['install'], function () {
  gulp.watch([buildConfig.frontend.js.project.src,
              buildConfig.frontend.js.test.src,
              buildConfig.frontend.index.src,
              buildConfig.frontend.css.project.src], ['build-frontend']);
});


