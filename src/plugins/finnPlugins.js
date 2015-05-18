global.banner = {} || global.banner;
var plugins = {};

global.banner.plugin = function(str) {

    var plugin = plugins[str];
    if (typeof plugin === 'function') {
        return plugin();
    } else {
        return plugin;
    }
};


var registerPlugin = function(str, obj) {
    plugins[str] = obj;
};

module.exports.registerPlugin = registerPlugin;
