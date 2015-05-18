var path = require('path');
var exec = require('shelljs').exec;

module.exports = function(cmd) {
    cmd = './node_modules/.bin/'.concat(cmd).replace(/\//g, path.sep);

    return function() {
        var args = [].slice.call(arguments, 0);
        args.unshift(cmd);
        exec(args.join(' '));
    };
};
