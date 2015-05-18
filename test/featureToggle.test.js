var featureSupported = require('../src/plugins/featureToogle.js');

var expect = require('expect.js');

describe('featureToggle', function() {

    describe('feature supported', function() {
        it('shall be true if feature flag parameter is present and value is true', function() {
            var result = featureSupported('supports-reload',
                '?os=ios8&device=ipad&supports-reload=tRue');
            expect(result).to.equal(true);
        });
    });

    describe('feature supported II', function() {
        it('shall be true if feature flag parameter is present and value is 1', function() {
            var result = featureSupported('supports-reload',
                '?os=ios8&device=ipad&supports-reload=1');
            expect(result).to.equal(true);
        });
    });

    describe('feature supported III', function() {
        it('shall be true if feature flag parameter is present and value not present', function() {
            var result = featureSupported('supports-reload',
                '?os=ios8&device=ipad&supports-reload');
            expect(result).to.equal(true);
        });
    });

    describe('feature not supported', function() {
        it('shall be false if feature flag parameter is present and value is false', function() {
            var result = featureSupported('supports-reload',
                '?os=ios8&device=ipad&supports-reload=false');
            expect(result).to.equal(false);
        });
    });

    describe('feature not supported', function() {
        it('shall be false if feature flag parameter is present and value is not 1', function() {
            var result = featureSupported('supports-reload',
                '?os=ios8&device=ipad&supports-reload=11');
            expect(result).to.equal(false);
        });
    });

    describe('feature not supported', function() {
        it('shall be false if feature flag parameter is not present', function() {
            var result = featureSupported('supports-reload', '?os=ios8&device=ipad');
            expect(result).to.equal(false);
        });
    });

});
