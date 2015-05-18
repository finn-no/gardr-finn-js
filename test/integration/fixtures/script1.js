var p = window.gardr.params;
var width = p.data.width||'100%';
var height = p.data.height||'225px';
document.write('<div id="banner" style="width:' + width + ';height:' + height + ';background:red;">'+
    '<div>' + p.name + '</div></div>');
