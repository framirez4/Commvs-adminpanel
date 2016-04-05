var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

gulp.task('configure', function () {
  gulp.src('configFile.json')
  .pipe(gulpNgConfig('kapeloi.config'))
  .pipe(gulp.dest('./js/config'))
});
