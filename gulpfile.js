var gulp = require('gulp');
var del = require('del');
var webserver = require('gulp-webserver');
var awspublish = require('gulp-awspublish');
var AWS = require('aws-sdk');

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: false
    }));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('build', ['clean'], function() {
  return gulp.src(
      [
        'bower_components/**/*.js',
        'bower_components/**/*.css',
        'css/**/*.css',
        'js/**/*.js',
        'index.html',
        'img/**/*.png',
        '!bower_components/**/tests/**',
        '!bower_components/**/test/**',
        '!bower_components/**/src/**',
      ], {
        base: './'
      }
    )
    .pipe(gulp.dest('build'));
});

gulp.task('publish', ['build'], function() {
  var params = {
    region: 'ap-northeast-1',
    params: {
      Bucket: 'touka.kagu.la',
    },
    credentials: new AWS.SharedIniFileCredentials({
      profile: 'touka-publish'
    }),
  };
  var publisher = awspublish.create(params);

  return gulp.src(['build/**/*'])
    .pipe(publisher.publish({}))
    .pipe(publisher.sync('', [/^logs\//]))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
