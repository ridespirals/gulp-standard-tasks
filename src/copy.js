'use strict';

var gulp = require('gulp');

module.exports = ({
    src = null,
    dest = null
}) => {
    return () => {
        return gulp.src([src]).pipe(gulp.dest(dest));
    };
};