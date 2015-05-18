/*
 *  Adjust aligment for top banners on object pages to right
 */
function adjustAlignmentTop(gardr) {
    gardr.on('params:parsed', floatRight);
}

function floatRight(params) {
    if (params.name === 'topboard') {
        var url = params.url;
        if (url && url.indexOf('finnkode=') > -1) {
            document.body.style.cssFloat = 'right';
        }
    }
}

module.exports = adjustAlignmentTop;
