'use strict';

const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const gulpif = require('gulp-if');

module.exports = ({
    src = null,
    dest = null,
    prefix = 'icon-',
    removeFill = false
}) => {
    return () => {
        return gulp.src(src).pipe(gulpif(removeFill, cheerio({
            run: ($) => {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        })))
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: {
                    prefix: prefix,
                    minify: true
                }
            }]
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(dest));
    };
};