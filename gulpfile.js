"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task("concatScripts", function() {
  return gulp.src([ //creating readable stream of data
    'js/jquery.js',
    'js/sticky/jquery.sticky.js',
    'js/main.js'])
  .pipe(maps.init())
  .pipe(concat("app.js")) //concat takes string
  .pipe(maps.write("./"))
  .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
   return gulp.src("scss/application.scss")
    .pipe(maps.init()) // create source maps: find which css we are using more easier
    .pipe(sass())
    .pipe(maps.write("./"))//next to the current folder
    .pipe(gulp.dest('css'));
});


gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']); // don't need return
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ['concatScripts', 'minifyScripts', 'compileSass'], function(){
  return gulp.src(["css/application.css", "js/app.min.js", "index.html"], { base: './'}) //base creates folder as well
    .pipe(gulp.dest("dist"));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
}); //if someone wants to start to write code asap,  gulp default is nice function because he/she can just type gulp default and conduct every tasks.
