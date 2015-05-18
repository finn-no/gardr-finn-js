var expect = require('expect.js');

var paramsId = require('../src/plugins/generateParamsId');
var PluginApi = require('gardr-core-plugin').PluginApi;

describe('paramsId', function() {
    beforeEach(function() {
        this.pluginApi = new PluginApi();
        sinon.spy(this.pluginApi, 'on');
    });

    it('should append id to gardrParams', function() {
        var gardrParams = {
            'name': 'some_name'
        };

        paramsId(this.pluginApi);
        this.pluginApi.trigger('params:parsed', gardrParams);

        expect(gardrParams.id).to.match(/^some_name\d{1,3}/);
    });

    it('should not append id to gardrParams if exist', function() {
        var gardrParams = {
            'name': 'some_name',
            'id': 'some_id'
        };

        paramsId(this.pluginApi);
        this.pluginApi.trigger('params:parsed', gardrParams);

        expect(gardrParams.id).to.equal('some_id');
    });

});
