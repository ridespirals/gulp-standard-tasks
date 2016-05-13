const gulp = require('gulp');
const tasks = require('../index.js')(gulp);

const settings = {
    jsSrc: 'src/javascript/app.js',
    jsDest: 'dist/javascript',
    cssSrc: 'src/scss/**/*',
    cssDest: 'dist/css',
    imgSrc: 'src/images/**/*',
    imgDist: 'dist/images',
    svgSrc: 'src/svg/*.svg',
    svgDist: 'dist/svg'
};

//
// Clean
//

gulp.task('clean', tasks.clean('./dist'));

//
// Copy
//

gulp.task('copy-images', tasks.copy({
    src: settings.imgSrc,
    dest: settings.imgDist
}));

//
// Sass tasks
//

gulp.task('sass-dev', tasks.css({
    src: settings.cssSrc,
    dest: settings.cssDest,
    browserSync: true
}));

gulp.task('sass-prod', tasks.css({
    src: settings.cssSrc,
    dest: settings.cssDest,
    mode: 'prod',
    rename: {
        suffix: '.min'
    }
}));

//
// SVG tasks
//

gulp.task('svg-sprite', tasks.svg({
    src: settings.svgSrc,
    dest: settings.svgDist
}));

//
// JavaScript tasks
//

gulp.task('browserify', tasks.browserify({
    src: settings.jsSrc,
    dest: settings.jsDest,
    bundleName: 'app-bundle.js'
}));

//
// Default gulp task
//

gulp.task('default', function(callback){
    tasks.sequence('clean', ['browserify', 'sass-dev', 'sass-prod', 'copy-images', 'svg-sprite'], callback);
});