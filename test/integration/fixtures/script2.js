var p       = window.gardr.params;
var width   = p.data.width||'100%';
var height  = p.data.height||'225px';
document.write('<div style="position: relative;">');
    document.write('<div style="position: absolute; right:0; bottom: 50px; background:blue;z-index:1;">' + p.name + '</div>');
    document.write('<div style="width:' + width + ';height:' + height + ';background:red;"><div>' + p.name + '</div></div>');
document.write('</div>');
