 // Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Initialize modules
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


// File paths
const files = { 
    scssPath: ['src/scss/**/*.scss'],
    jsPath: 'src/js/**/*.js'
}

// SCSS task: compile scss to css and place in dist/css folder
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist/css')
    );
}

// JS task: concatenates and uglifies JS files to main.min.js, which is placed in dist/js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js')
    );
}

// Watch task: watch SCSS and JS files for changes
function watchTask(){
    watch([files.scssPath, files.jsPath],
        series(
            parallel(scssTask, jsTask)
        )
    );    
}

exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);
