const    gulp 		       = require('gulp');
const    sass            = require('gulp-sass')(require('sass'));
const    browserSync 	   = require('browser-sync');
const    concat 		     = require('gulp-concat');
const    uglify 		     = require('gulp-uglifyjs');
const    cssnano     	   = require('gulp-cssnano');
const    rename      	   = require('gulp-rename');
const    del             = require('del');
const    pngquant 		   = require('imagemin-pngquant');
const    cache           = require('gulp-cache');
const    autoprefixer    = require('gulp-autoprefixer');
const    spritesmith 	   = require('gulp.spritesmith');
const    minify          = require('gulp-minify');
const    cleanCSS        = require('gulp-clean-css');
const    gulpif          = require('gulp-if');
const    webpack         = require('webpack-stream');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

function style() {
  return gulp.src([
    'app/sass/style.scss'
  ])
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
};

function watch() {
  gulp.watch('./app/js/app.js').on('change', browserSync.reload);
  gulp.watch('./app/sass/**/*.scss', style);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
};

gulp.task('compressjs', function () {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js";
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(function (path) {
      path.extname = ".min.css";
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', () => {
  return gulp.src([
    './app/pics/**.jpg',
    './app/pics/**.png',
    './app/pics/**.jpeg',
    './app/pics/*.svg',
    './app/pics/**/*.jpg',
    './app/pics/**/*.png',
    './app/pics/**/*.jpeg'
  ])
    .pipe(gulp.dest('./dist/img'));
});


gulp.task('htmlInclude', () => {
  return gulp.src(['./app/*.html'])
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('style', style);
gulp.task('watch', watch);
gulp.task('dev', gulp.parallel('watch','browser-sync','style'));
gulp.task('build', gulp.parallel('compressjs','minify-css','images','htmlInclude'));
