module.exports = function(gulp) {
    return {
        browserify: require('./dist/browserify'),
        browserSync: require('./dist/browser-sync'),
        clean: require('./dist/clean'),
        copy: require('./dist/copy'),
        css: require('./dist/css'),
        jekyll: require('./dist/jekyll'),
        svg: require('./dist/svg'),
        revision: require('./dist/rev'),
        sequence: require('run-sequence').use(gulp)
    };
};