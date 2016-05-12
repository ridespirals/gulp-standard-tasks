'use strict';

const gulp = require('gulp');
const autoprefix = require('gulp-autoprefixer');
const gulpSourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const gulpCsso = require('gulp-csso');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const gulpRename = require('gulp-rename');
const cmq = require('gulp-combine-media-queries');
const gulpif = require('gulp-if');
const nodeBrowserSync = require('browser-sync');

function onError(err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
}

module.exports = ({
    src = 'src',
    dest = 'dest',
    mode = 'dev',
    autoprefixer = 'last 3 versions',
    csso = null,
    sourcemaps = null,
    browserSync = false,
    rename = {}
}) => {
    var sourcemapsEnabled = (mode === 'dev' && sourcemaps !== false) || sourcemaps === true;
    var cssoEnabled = (mode === 'prod' && csso !== false) || csso === true;

    return () => {
        nodeBrowserSync.notify('Sass building');

        return gulp.src(src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gulpif(sourcemapsEnabled, gulpSourcemaps.init()))
        .pipe(sass())
        .pipe(cmq({
            log: true
        }))
        .pipe(autoprefix({
            browsers: [autoprefixer],
            cascade: false
        }))
        .pipe(gulpif(cssoEnabled, gulpCsso()))
        .pipe(gulpif(sourcemapsEnabled, gulpSourcemaps.write('.')))
        .pipe(gulpif(browserSync, nodeBrowserSync.reload({
            stream: true
        })))
        .pipe(gulpRename(rename))
        .pipe(gulp.dest(dest));
    };
}
