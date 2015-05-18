var expect = require('expect.js');

var feedExt = require('../src/plugins/feedExt');
var PluginApi = require('gardr-core-plugin').PluginApi;
var TEST_URL = 'http://foo.bar%7C3.0%7C989.1%7C4887268%7C0%7C16%7CADTECH;cookie=info;kvlastseen=false;' +
    'kvuserid=154500505;kvuserareaid=20061';
var gardrParams = {
    url: TEST_URL,
};


describe('feedExt', function() {
    describe('registerFeedPlugin', function() {
        it('should register a proper plugin function on the proper key', function() {
            var pluginApi = new PluginApi();

            feedExt(pluginApi);
            pluginApi.trigger('params:parsed', gardrParams);

            var result = global.banner.plugin('contextData');

            var expected = {
                parameters: 'cookie=info;kvlastseen=false;kvuserid=154500505;kvuserareaid=20061',
                params: {
                    cookie: 'info',
                    kvlastseen: 'false',
                    kvuserareaid: '20061',
                    kvuserid: '154500505'
                },
                keyvalues: 'kvuserid=154500505;kvuserareaid=20061',
                keywords: '',
                score: '',
                segments: '',
                data: {
                    kvuserareaid: '20061',
                    kvuserid: '154500505'
                }
            };

            expect(result).to.eql(expected);
        });
    });

});
