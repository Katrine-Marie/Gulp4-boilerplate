const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

gulp.task('default', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);

gulp.task('lint', () =>
    gulp.src('src/**/*.js')
        .pipe(eslint('config.json'))
        .pipe(eslint.format())
);
