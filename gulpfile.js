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
        //'bower_components/**/dist/**/*.min.js',
        'config/plugins/pace/pace.min.js',
        'config/plugins/jquery.js',
        'config/plugins/bootstrap-3.3.1/js/bootstrap.min.js',
        'config/plugins/jquery.ui.map.js',
        'config/plugins/jquery.easing-1.3.pack.js',
        'config/plugins/jquery.parallax-1.1.3.js',
        'config/plugins/magnific-popup/jquery.magnific-popup.min.js',
        'config/plugins/typed/typed.js',
        'config/plugins/easypiechart/jquery.easypiechart.min.js',
        'config/plugins/simpleCaptcha/jquery.simpleCaptcha.js',
        'config/plugins/Simple-Ajax-Uploader/SimpleAjaxUploader.min.js',
        'config/plugins/validator/jquery.validate.min.js',
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
    //    'bower_components/**/dist/**/*.min.css',
        'config/plugins/pace/pace.css',
        'config/plugins/bootstrap-3.3.1/css/bootstrap.min.css',
        'config/plugins/font-awesome-4.2.0/css/font-awesome.min.css',
        'config/plugins/typed/typed.css',
        'config/plugins/magnific-popup/magnific-popup.css',
        'config/plugins/simpleCaptcha/jquery.simpleCaptcha.css',
        'web/dev/css/style.css',
        'web/dev/css/skin-black.css'
        //'web/dev/css/**/*.css',
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
        'config/plugins/font-awesome-4.2.0/fonts/FontAwesome.otf',
        'config/plugins/font-awesome-4.2.0/fonts/fontawesome-webfont.eot',
        'config/plugins/font-awesome-4.2.0/fonts/fontawesome-webfont.svg',
        'config/plugins/font-awesome-4.2.0/fonts/fontawesome-webfont.ttf',
        'config/plugins/font-awesome-4.2.0/fonts/fontawesome-webfont.woff'
    ])
        .pipe(gulp.dest('web/bundle/fonts'))
        .pipe(notify({ message: 'Fonts task complete' }));
});

gulp.task('external', function() {
    return gulp.src([
        'config/plugins/simpleCaptcha/*'
    ])
        .pipe(gulp.dest('web/assets/plugins/simpleCaptcha'))
        .pipe(notify({ message: 'External task complete' }));
});

gulp.task('clean', function() {
    return del(['web/bundle/css', 'web/bundle/js', 'web/bundle/images', 'web/bundle/fonts', 'web/assets']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images','fonts','external');
});

gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('web/dev/css/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('web/dev/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('web/dev/images/**/*', ['images']);
});