var gulp = require('gulp');
var flatten = require('gulp-flatten');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css')
var mainBowerFiles = require('main-bower-files');
var debug = require('gulp-debug')

var dest_path =  '.';

gulp.task('bower', function() {

        var jsFilter = filter('*.js');
        var cssFilter = filter('*.css');
        var fontFilter = filter(['*.eot', '*.woff', '*.svg', '*.ttf']);

        var files= mainBowerFiles().concat(["css/dc.css","css/material.css","style.css","js/dc.js"]);
        return gulp.src(files)
        .pipe(debug({title:"all:"}))

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe(debug({title:"js:"}))
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(jsFilter.restore())

        // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe(debug({title:"css:"}))
        .pipe(concat('bower.css'))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssFilter.restore())

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dest_path + '/fonts'));
});


gulp.task('default', ['bower'], function() {
  // place code for your default task here
});


