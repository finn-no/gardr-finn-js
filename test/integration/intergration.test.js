var expect = require('expect.js');

var hosts = {
    desktop: require('../../src/desktop/host.js'),
    mobile: require('../../src/mobile/host.js')
};

function generateUrlSetup() {
    function getUrls(map){
        return [
            {
                width: '100%',
                height: '225px'
            },
            {
                width: '100%',
                height: '250px'
            },
            {
                width: '100px',
                height: '300px'
            },
            {
                width: '300px',
                height: '300px'
            },
            {
                width: '300px',
                height: '100px'
            },
            {
                width: '60px',
                height: '60px'
            }
        ].map(map);
    }

    function setUrl(url) {
        return function(entry){
            entry.url = url;
            return entry;
        };
    }

    return [
        { urls: getUrls(setUrl('script1.js'))},
        { urls: getUrls(setUrl('script2.js'))},
        { urls: getUrls(setUrl('script3.js'))},
        { urls: getUrls(setUrl('script4.js'))}
    ];
}

describe('intergration', function(){

    ['desktop', 'mobile'].forEach(function(key) {

        var getHost = hosts[key];

        it('should be defined', function(){
            expect(getHost).to.be.ok();
            expect(getHost).to.be.a(Function);
        });


        it('should load up an instance', function() {
            var host = getHost({
                iframeUrl: '/base/dist/js/gardr/desktop/iframe.htm?ts=' + (+new Date()),
                burtScript: '/base/test/integration/fixtures/empty.js',
                burtStartTracking: function() {

                }
            });

            expect(host).to.be.ok();
            expect(host).to.be.a('object');
            expect(host.pluginApi).to.be.a('object');
        });

        generateUrlSetup().forEach(function(entry, i) {

            describe('entry ' + (i + 1), function() {
                beforeEach(function(){

                    this.div = document.createElement('div');
                    this.div.id = 'random-' + Math.round(Math.random() * 1000) + '-' + i;

                    document.body.appendChild(this.div);
                });

                afterEach(function(){
                    if (this.div) {
                        document.body.removeChild(this.div);
                        this.div = null;
                    }
                });

                var host = getHost({
                    iframeUrl: '/base/dist/js/gardr/' + key + '/iframe.htm?ts=' + (+new Date()),
                    burtScript: '/base/test/integration/fixtures/empty.js',
                    burtStartTracking: function() {}
                });

                entry.urls.forEach(function(scriptEntry, urlIndex){
                    it('should render url ' + scriptEntry.url, function(done) {
                        var name = 'test-' + i + '-' + urlIndex;
                        host.queue(name, {
                            container: this.div,
                            url: '/base/test/integration/fixtures/' + scriptEntry.url + '?',
                            width: scriptEntry.width,
                            height: scriptEntry.height,
                            data: scriptEntry
                        });

                        host.render(name, function(err, item){
                            // console.log('Rendered: ' + JSON.stringify(item.rendered, null, 4));
                            expect(item.rendered.height).to.equal(parseInt(scriptEntry.height, 10));
                            if (scriptEntry.width === '100%') {
                                expect(item.rendered.width).to.equal(document.body.clientWidth);
                            } else {
                                expect(item.rendered.width).to.equal(parseInt(scriptEntry.width, 10));
                            }
                            done();
                        });
                    });
                });
            });


        });


    });

});
