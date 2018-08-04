'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify');



gulp.task('sass', function () {
    gulp.src('sass/*.scss', {base: 'sass'})
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('clean', function () {
    return gulp.src('js', {read: false})
        .pipe(clean());
});

gulp.task('prod', function() {
    return gulp.src('jsWork/*.js')
        .pipe(concat('js/main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

gulp.task('watch', function () {
    browserSync.init({
        proxy: "portfolio.mysite.local"
    });

    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['watch']);