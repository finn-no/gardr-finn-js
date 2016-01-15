// On gardr params:parsed event: parses the cookie and looks for
// USERID. If kvuserid
// is not present on the parameters, it will be injected with
// the data from the cookie.

// Important: This plugin must be executed before feedExt plugin,
// because feedExt depends on this plugin.


var parsedCookies;

module.exports = function(gardr) {
    gardr.on('params:parsed', parseCookieAndInjectOnUrl);
};

function parseCookieAndInjectOnUrl(gardrParams) {
    parseCookie();
    tryToInject('kvuserid', 'userid', gardrParams);
}

function parseCookie() {
    parsedCookies = document.cookie.split(/\s*;\s*/).reduce(function(all, pair) {
        var tmp = pair.split('=');
        all[tmp[0]] = tmp[1];
        return all;
    }, {});
}

// If urlKey is not already in script url:
// Look for cookieKey in cookies.
// If found, inject the key-value pair to the url
function tryToInject(urlKey, cookieKey, gardrParams) {
    if (gardrParams.url.indexOf(urlKey) === -1) {
        var cookieVal = parsedCookies[cookieKey] || parsedCookies[cookieKey.toUpperCase()];
        if (cookieVal) {
            gardrParams.url += ';' + urlKey + '=' + cookieVal;
        }
    }
}
