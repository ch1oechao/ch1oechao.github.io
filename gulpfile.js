const { series, src, dest, parallel } = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

const cleanCSS = require('gulp-clean-css');

const paths = {
  styles: {
    src: '_sass/*.scss',
    dest: 'assets/css/'
  },
  scripts: {
    src: '_scripts/*.js',
    dest: 'assets/js/'
  }
};

function jsTranspile() {
    return src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(dest(paths.scripts.dest))
}

function cssTranspile() {
    return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('index.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(dest(paths.styles.dest))
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

const build = series(
    parallel(
        cssTranspile,
        jsTranspile
    )
);

exports.styles = cssTranspile;
exports.scripts = jsTranspile;
exports.watch = watch;
exports.build = build;
exports.default = build;
