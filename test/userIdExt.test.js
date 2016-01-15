var expect = require('expect.js');

var userIdExt = require('../src/plugins/userIdExt');
var PluginApi = require('gardr-core-plugin').PluginApi;

describe('userIdExt', function() {
    beforeEach(function() {
        this.pluginApi = new PluginApi();
        sinon.spy(this.pluginApi, 'on');

        document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'userarea=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'USERID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'USERAREA=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    });

    it('should append userid from cookie to url', function() {
        var gardrParams = {
                url: 'www.foo.com'
            },
            userid = 'userfoo';

        document.cookie = 'userid=' + userid;

        userIdExt(this.pluginApi);
        this.pluginApi.trigger('params:parsed', gardrParams);

        expect(gardrParams.url).to.have.string(';kvuserid=' + userid);
    });

    it('should append userid from cookie to url', function() {
        var gardrParams = {
                url: 'www.foo.com'
            },
            userid = 'userfoo',
            areaid = 'areabar';

        document.cookie = 'userid=' + userid;
        document.cookie = 'userarea=' + areaid;

        userIdExt(this.pluginApi);
        this.pluginApi.trigger('params:parsed', gardrParams);

        expect(gardrParams.url).to.equal('www.foo.com;kvuserid=' + userid);
    });


    it('should not append userid from cookie if userid is already on url', function() {
        var userid = 'bar';
        var gardrParams = {
            url: 'www.foo.com;kvuserid=' + userid
        };

        document.cookie = 'userid=' + userid;

        userIdExt(this.pluginApi);
        this.pluginApi.trigger('params:parsed', gardrParams);

        expect(gardrParams.url).to.equal('www.foo.com;kvuserid=' + userid);
    });

});
