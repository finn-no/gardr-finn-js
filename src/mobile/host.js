var gardrHost = require('gardr-host');
var wallpaper = require('gardr-plugin-host-wallpaper');
var burt = require('gardr-plugin-host-burt');

gardrHost.plugin(burt);
gardrHost.plugin(wallpaper);
module.exports = gardrHost;
