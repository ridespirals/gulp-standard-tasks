'use strict';

const gulp = require('gulp');
const rev = require('gulp-rev');
const revCssUrls = require('gulp-rev-css-url');

module.exports = ({
    src = null,
    dest = null,
    manifest = null
}) => {
    return () => {
        return gulp.src(src)
            .pipe(rev())
            .pipe(revCssUrls())
            .pipe(gulp.dest(dest))
            .pipe(rev.manifest())
            .pipe(gulp.dest(manifest));
    };
};