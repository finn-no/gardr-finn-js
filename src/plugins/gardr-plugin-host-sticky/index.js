var insertCss = require('./insertCss.js');
var stickyTopPosition = 10;

insertCss('.gardr-sticky { position: fixed; top: 10px; z-index: 1}');

function makeSticky(gardrPluginApi) {
    gardrPluginApi.on('item:afterrender', function(item) {
        if (item.options.isSticky) {
            console.log('sticky true');
            var stickyThreshold = item.options.container.getBoundingClientRect().top - stickyTopPosition;

            window.addEventListener('scroll', function() {
                handleStickyBanner(stickyThreshold, item.options.container);
            }, false);
        }
    });
}

function log(msg) {
    if (console && console.log) {
        console.log(msg);
    }
}

var stickyClassName = 'gardr-sticky';


// scrolledElement er (alltid?) document. Får jeg tak i dette via item, eller må dette sendes inn via options?
function handleStickyBanner(threshold, stickyBanner) {
    var top = window.document.documentElement.scrollTop;
    log('top: ' + top);
    if (top >= threshold) {
        log('adding sticky class');
        addClass(stickyBanner, stickyClassName);
    } else {
        log('removing sticky class');
        removeClass(stickyBanner, stickyClassName);
    }
}

function addClass(element, classToAdd) {
    var currentClassValue = element.className;

    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === '')) {
            element.className = classToAdd;
        } else {
            element.className += ' ' + classToAdd;
        }
    }
}

function removeClass(element, classToRemove) {
    var currentClassValue = element.className;

    if (currentClassValue == classToRemove) {
        element.className = '';
        return;
    }

    var classValues = currentClassValue.split(' ');
    var filteredList = [];

    for (var i = 0; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }

    element.className = filteredList.join(' ');
}

module.exports = makeSticky;
