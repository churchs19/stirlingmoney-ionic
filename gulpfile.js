var gulp = require('gulp'),
  gulpWatch = require('gulp-watch'),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  tsify = require('tsify'),
  pretty = require('prettysize'),
  merge = require('lodash.merge'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  stream = require('stream'),
  argv = process.argv;

//var tsSrc = ['./app/lib/adal/adal.js', './app/app.ts', './typings/index.d.ts'];
/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
// var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildBrowserify = function(options) {
  var defaultOptions = {
    watch: false,
    src: ['./app/app.ts', './typings/index.d.ts'],
    outputPath: 'www/build/js/',
    outputFile: 'app.bundle.js',
    minify: false,
    browserifyOptions: {
      cache: {},
      packageCache: {},
      debug: true
    },
    watchifyOptions: {},
    tsifyOptions: {},
    uglifyOptions: {},
    externalRequires: [],
    onError: function(err) {
      console.error('Browserify Bundle Error: ' + err.toString());
      this.emit('end');
    },
    onLog: function(log) {
      console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
    }
  }

  options = merge(defaultOptions, options);

  var b = browserify(options.src, options.browserifyOptions)
    .plugin(tsify, options.tsifyOptions);

  if (options.externalRequires.length > 0) {
    for (var i = 0; i < options.externalRequires.length; i++) {
      b.require(options.externalRequires[i].file, options.externalRequires[i].opts);
    }
  }

  if (options.watch) {
    b = watchify(b, options.watchifyOptions);
    b.on('update', bundle);
    b.on('log', options.onLog);
  }

  return bundle();

  function bundle() {
    var debug = options.browserifyOptions.debug;
    return b.bundle()
      .on('error', options.onError)
      .pipe(source(options.outputFile))
      .pipe(buffer())
      .pipe(debug ? sourcemaps.init({
        loadMaps: true
      }) : noop())
      .pipe(options.minify ? uglify(options.uglifyOptions) : noop())
      .pipe(debug ? sourcemaps.write('./', {
        includeContent: true,
        sourceRoot: '../../../'
      }) : noop())
      .pipe(gulp.dest(options.outputPath));
  }

  function noop() {
    return new stream.PassThrough({
      objectMode: true
    });
  }
};

var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');
var tslint = require('ionic-gulp-tslint');

var isRelease = argv.indexOf('--release') > -1;

// var browserify = require('browserify');
// var tsify = require('tsify');
// var watchify = require('watchify');
// var source = require('vinyl-source-stream');
// var walkSync = require('walk-sync');
// var merge = require('lodash.merge');

// function compileClientJs(options) {
//   var defaultOptions = {
//     watch: false,
//     debug: true
//   };

//   options = merge(defaultOptions, options);

//   var bundler = browserify({
//     debug: options.debug
//   }).add('./app/app.ts');

//   walkSync('typings').forEach(function(file) {
//     if (file.match(/\.d\.ts$/)) {
//       bundler.add("typings/" + file);
//     }
//   });

//   walkSync('app/lib/adal').forEach(function(file) {
//     if (file.match(/\.d\.ts$/)) {
//       bundler.add("app/lib/adal/" + file);
//     }
//   });
//   bundler.plugin(tsify);

//   if(options.watch) {

//   }

//   return bundler.bundle()
//     .on('error', function(error) {
//       console.error(error.toString());
//     })
//     .pipe(source('app.bundle.js'))
//     .pipe(gulp.dest('www/build/js/'));
// }

gulp.task('watch', ['clean'], function(done) {
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function() {
      gulpWatch('app/**/*.scss', function() {
        gulp.start('sass');
      });
      gulpWatch('app/**/*.html', function() {
        gulp.start('html');
      });
      buildBrowserify({
        watch: true,
        browserifyOptions: {},
        externalRequires: [{
          file: './www/build/js/adal.js',
          opts: { expose: 'adal' }
        }]
      }).on('end', done);
      // compileClientJs({
      //   watch: true
      // });
    }
  );
});

gulp.task('build', ['clean'], function(done) {
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function() {
      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        },
        externalRequires: [{
          file: './www/build/js/adal.js',
          opts: { expose: 'adal' }
        }]
      }).on('end', done);
    }
  );
});

gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', function() {
  copyScripts({});
  copyScripts({
    src: 'app/lib/adal/adal.js'
  });
});
gulp.task('clean', function() {
  return del('www/build');
});
gulp.task('lint', tslint);
