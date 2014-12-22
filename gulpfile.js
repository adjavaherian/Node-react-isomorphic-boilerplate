var gulp = require('gulp')
var gutil = require('gulp-util');
var watchify = require('watchify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')


var bundler = watchify(browserify('./app/App.js', watchify.args));
// add any other browserify options or transforms here
// v=b.transform('brfs');
console.log('This ran.')
gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', function (msg) {'Done'})

function bundle() {
	console.log('JS change detected. Updating /public/dist/bundle.js.')
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/dist'));
}

