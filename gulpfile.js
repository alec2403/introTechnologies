var gulp                = require('gulp');
var browserSync         = require('browser-sync');
var stylus              = require('gulp-stylus');
var nunjucksRender      = require('gulp-nunjucks-render'); // importing the plugin
 
gulp.task('serve', ['stylus', 'nunjucks'], function() {
    browserSync.init({
        server: {
            baseDir: 'app/build'
        }
    });
    gulp.watch("./stylus/main.styl", ['stylus']);
    gulp.watch("./app/pages/index.html").on('change', browserSync.reload);
});
 
gulp.task('stylus', function(){

    return gulp.src("./stylus/main.styl")
            .pipe(stylus())
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream());
})

// writing up the gulp nunjucks task
gulp.task('nunjucks', function() {
  console.log('nunjucking');
 
  // configuring the templates folder for nunjucks
  nunjucksRender.nunjucks.configure(['app/templates/']);
  console.log('nunjucking 2')
  // get the pages files
  return gulp.src('./app/pages/**/*.+(html)')
    .pipe(nunjucksRender())
    .pipe(gulp.dest('app/build'))
    console.log('sirvio')
});
 
//default task to be run with gulp
gulp.task('default', ['serve']);