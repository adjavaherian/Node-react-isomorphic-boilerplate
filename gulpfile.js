//gulpfile.js
'use strict';

//Require
var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var del = require('del');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

//Globals
var BROWSER_SYNC_RELOAD_DELAY = 500;
var paths = {
    base: './',
    server: './index.js',
    scripts: ['./app/App.js'],
    styles: ['./app/styles/**/*.scss'],
    images: [],
    dist: 'public/dist/'
};
var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};

//Tasks
gulp.task('default', ['browserify', 'sass', 'browser-sync', 'watch']);
gulp.task('clean', function() {
    console.log('cleaning: '+paths.dist[0]+'*.*');
    del(paths.dist+'*.*');
});
gulp.task('sass', function() {
    console.log('sass to ' + paths.dist + 'main.css.');
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.reload({ stream:true }));
});
gulp.task('browserify', function(){
    console.log('browserify to ' + paths.dist + 'bundle.js.');
    var bundler = browserify({
        entries: paths.scripts,
        debug: true
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .pipe(sourcemaps.write(paths.base))
            .pipe(gulp.dest(paths.dist))
            .pipe(browserSync.reload({ stream:true }));
    };

    return bundle();
});
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({

        // nodemon our expressjs server
        script: paths.server,
        ignore: [
            './app/**',
            './public/**'
        ],
        watch: paths.server
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false   //
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});
gulp.task('browser-sync', ['nodemon'], function(){

    browserSync({

        // watch the following files; changes will be injected (css & images) or cause browser to refresh
        files: ['public/**/*.*'],

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,

        // open the proxied app in chrome
        browser: ['google chrome'],
        open: true
    });


});
gulp.task('watch', function(){
    gulp.watch(paths.server, ['nodemon']);
    gulp.watch(paths.scripts, ['browserify']);
    gulp.watch(paths.styles, ['sass']);
});