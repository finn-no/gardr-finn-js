var p       = window.gardr.params;
var width   = p.data.width||'100%';
var height  = p.data.height||'225px';
document.write('<div style="position: static;">');
    document.write('<div style="position: static;">');
        document.write('<a href="#" style="background:green;">');
            document.write('<div style="width:' + width + ';height:' + height + ';background:red;">' +
                '<div>' + p.name + '</div></div>');
        document.write('</a>');
    document.write('</div>');
document.write('</div>');
