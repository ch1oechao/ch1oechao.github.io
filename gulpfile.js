var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('scripts', function() {
    return gulp.src('assets/index.js')
        //js代码校验
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //给文件添加.min后缀
        .pipe(rename({
            suffix: '.min'
        }))
        //压缩脚本文件
        .pipe(uglify())
        //输出压缩文件到指定目录
        .pipe(gulp.dest('assets'))
        //提醒任务完成
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('styles', function() {
    //编译sass
    return gulp.src('_sass/*.scss')
        .pipe(sass())
        //添加前缀
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //合并为 index.css
        .pipe(concat('index.css'))
        //给文件添加.min后缀
        .pipe(rename({
            suffix: '.min'
        }))
        //压缩样式文件
        .pipe(minifycss())
        //输出压缩文件到指定目录
        .pipe(gulp.dest('assets/css'))
        //提醒任务完成
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('_sass/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('assets/js/index.js', ['scripts']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);
