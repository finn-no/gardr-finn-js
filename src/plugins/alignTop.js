/*
 *  Adjust aligment for top banners on object pages to right
 */
 var domready = require('domready');

function adjustAlignmentTop(gardr) {
    gardr.on('params:parsed', floatRight);
}

function floatRight(params) {
    if (params.name === 'topboard') {
        var url = params.url;
        if (url && url.indexOf('finnkode=') > -1) {
            domready(function() {
                document.body.style.cssFloat = 'right';
            });
        }
    }
}

module.exports = adjustAlignmentTop;
