var gardrExt = require('gardr-ext');
var featureSupported = require('../plugins/featureToogle');
var feed = require('../plugins/feedExt');
var eventListener = require('eventlistener');
var userid = require('../plugins/userIdExt');
var paramsid = require('../plugins/generateParamsId');
var uniqueid = require('gardr-plugin-ext-unique-token');


gardrExt.plugin(paramsid);
gardrExt.plugin(feed);
gardrExt.plugin(userid);
gardrExt.plugin(uniqueid);

if (featureSupported('supports-reload', window.location.search) || isOS('iOS', window.location.search)) {
    window.onhashchange = function() {
        window.location.reload();
    };
}

gardrExt({
    allowedDomains: ['helios.finn.no','www.finn.no'],
    burtScript: '//m.burt.io/f/finn-no.xdi.js',
    burtConnect: function(burtUnit, el) {
        if (!burtUnit) {
            return;
        }

        if (window.adtech) {
            connectCampaignId(burtUnit);
        } else {
            var script = el.getElementsByTagName('script')[0];
            eventListener.add(script, 'load', connectCampaignId.bind(null, burtUnit));
        }
    }
});

function connectCampaignId(burtUnit) {
    if (!window.adtech) {
        return;
    }

    var campaignId = window.adtech.flightId + '_' + window.adtech.bannerId;
    burtUnit.connect('burt.campaign', 'campaign-id', campaignId);
    burtUnit.connect('burt.campaign', 'creative-id', campaignId);
    burtUnit.connect('sch_no.placement', 'placement-id', window.adtech.placementId);
}

function isOS(requestedOs, url) {
    var subString = 'os=' + requestedOs;
    if (url) {
        if (url.indexOf(subString) > -1) {
            return true;
        }
    }
    return false;
}
