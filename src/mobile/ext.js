var gardrExt = require('gardr-ext');
var burt = require('gardr-plugin-ext-burt');
var feed = require('../plugins/feedExt');
var userId = require('../plugins/userIdExt');
var wallpaper = require('gardr-plugin-ext-wallpaper');
var eventListener = require('eventlistener');

// add plugins
gardrExt.plugin(burt);
gardrExt.plugin(userId);
gardrExt.plugin(feed);
gardrExt.plugin(wallpaper);

// start gardr ext
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
