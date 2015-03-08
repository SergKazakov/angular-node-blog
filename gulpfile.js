'use strict';

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    livereload    = require('gulp-livereload'),
    sourcemaps    = require('gulp-sourcemaps'),
    plumber       = require('gulp-plumber'),
    jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish');

gulp.task('sass', function () {
  gulp.src('client/scss/main.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: true
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('client/css'))
  .pipe(livereload());
});

gulp.task('scripts', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**', '!./client/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(livereload());
});

gulp.task('default', ['sass'], function(){
  livereload.listen();
  gulp.watch('client/scss/**/*.scss', ['sass']);
});
