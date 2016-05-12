'use strict';

const del = require('del');

module.exports = (path) => {
    return () => {
        return del([
            path
        ]);
    };
};