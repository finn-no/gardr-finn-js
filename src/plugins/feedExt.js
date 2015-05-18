var queryParams = require('query-params');
var extend = require('util-extend');
var finnBanner = require('./finnPlugins');
var ADTECH_SPLIT = '|ADTECH;';
var URL_SEP = ';';

function init(gardr) {
    gardr.on('params:parsed', registerFeedPlugin);
}

function registerFeedPlugin(gardrParams) {
    finnBanner.registerPlugin('contextData', function() {

        var paramData = createParamData(decodeURIComponent(gardrParams.url));

        var keyValues = {
            kvuserid: gardrParams.kvuserid || (paramData ? paramData.params.kvuserid : ''),
            kvuserareaid: gardrParams.kvuserareaid || (paramData ? paramData.params.kvuserareaid : '')
        };

        return extend(paramData, {
            keyvalues: queryParams.encode(keyValues, URL_SEP),
            data: keyValues
        });
    });
}

function createParamData(url) {
    if (url.indexOf(ADTECH_SPLIT) > -1) {

        url = url.split(ADTECH_SPLIT);
        var params = queryParams.decode(url[1]);
        return {
            parameters: url[1],
            params: params,
            keywords: params.keywords || '',
            score: params.score || '',
            segments: params.segments || ''
        };
    }
}

module.exports = init;
