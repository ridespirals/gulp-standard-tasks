'use strict';

var browserSync = require('browser-sync');
var jekyll   = 'bundle';
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

module.exports = {
	build: function (done) {
	    browserSync.notify(messages.jekyllBuild);
	    return cp.spawn( jekyll , ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
	        .on('close', function(){
	        	setTimeout(done, 100);
	        });
	}
};