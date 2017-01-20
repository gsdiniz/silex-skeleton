var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('scripts', function() {
    return gulp.src([
        'web/dev/js/**/*.js'
    ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('web/bundle/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('web/bundle/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Styles
gulp.task('styles', function() {
    return gulp.src([
        'web/dev/css/**/*.css',
    ])
        .pipe(cssnano())
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('web/bundle/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('web/bundle/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('images', function() {
    return gulp.src('web/dev/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('web/bundle/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('fonts', function() {
    return gulp.src([
        'web/dev/fonts/*'
    ])
        .pipe(gulp.dest('web/bundle/fonts'))
        .pipe(notify({ message: 'Fonts task complete' }));
});

gulp.task('clean', function() {
    return del(['web/bundle/css', 'web/bundle/js', 'web/bundle/images', 'web/bundle/fonts']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images','fonts');
});

gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('web/dev/css/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('web/dev/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('web/dev/images/**/*', ['images']);
});