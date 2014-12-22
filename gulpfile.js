var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

var b = browserify('./app/App.js');

gulp.task('js', function() {
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/dist'));
})
