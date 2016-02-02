var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    rABS: 'javascript/xlsx/xlsxworker2.js',
    norABS: 'javascript/xlsx/xlsxworker1.js',
    noxfer: 'javascript/xlsx/xlsxworker.js'
};

var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
if (!rABS) {
    document.getElementsByName("userabs")[0].disabled = true;
    document.getElementsByName("userabs")[0].checked = false;
}

var use_worker = typeof Worker !== 'undefined';
if (!use_worker) {
    document.getElementsByName("useworker")[0].disabled = true;
    document.getElementsByName("useworker")[0].checked = false;
}

var transferable = use_worker;
if (!transferable) {
    document.getElementsByName("xferable")[0].disabled = true;
    document.getElementsByName("xferable")[0].checked = false;
}

var wtf_mode = false;

function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

function ab2str(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
    return o;
}

function s2ab(s) {
    var b = new ArrayBuffer(s.length * 2),
        v = new Uint16Array(b);
    for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
    return [v, b];
}

function xw_noxfer(data, cb) {
    var worker = new Worker(XW.noxfer);
    worker.onmessage = function (e) {
        switch (e.data.t) {
        case 'ready':
            break;
        case 'e':
            console.error(e.data.d);
            break;
        case XW.msg:
            cb(JSON.parse(e.data.d));
            break;
        }
    };
    var arr = rABS ? data : btoa(fixdata(data));
    worker.postMessage({
        d: arr,
        b: rABS
    });
}

function xw_xfer(data, cb) {
    var worker = new Worker(rABS ? XW.rABS : XW.norABS);
    worker.onmessage = function (e) {
        switch (e.data.t) {
        case 'ready':
            break;
        case 'e':
            console.error(e.data.d);
            break;
        default:
            xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
            console.log("done");
            cb(JSON.parse(xx));
            break;
        }
    };
    if (rABS) {
        var val = s2ab(data);
        worker.postMessage(val[1], [val[1]]);
    } else {
        worker.postMessage(data, [data]);
    }
}

function xw(data, cb) {
    transferable = document.getElementsByName("xferable")[0].checked;
    if (transferable) xw_xfer(data, cb);
    else xw_noxfer(data, cb);
}


function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
}


function process_wb(wb) {
    var output = "";
    output = to_json(wb);
    if (out.innerText === undefined) out.textContent = output;
    else {
        out.innerText = JSON.stringify(output, 2, 2);
        // construct an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open("post", "/api/upload", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // send the collected data as JSON
        xhr.send(output);

        xhr.onloadend = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert("Carga exitosa");
            } else {
                alert("Intentar de nuevo");
            }
        };
    }
    if (typeof console !== 'undefined') console.log("output", new Date());
}

var drop = document.getElementById('drop');

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    rABS = document.getElementsByName("userabs")[0].checked;
    use_worker = document.getElementsByName("useworker")[0].checked;
    var files = e.dataTransfer.files;
    var f = files[0]; {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
            var data = e.target.result;
            if (use_worker) {
                xw(data, process_wb);
            } else {
                var wb;
                if (rABS) {
                    wb = X.read(data, {
                        type: 'binary'
                    });
                } else {
                    var arr = fixdata(data);
                    wb = X.read(btoa(arr), {
                        type: 'base64'
                    });
                }
                process_wb(wb);
            }
        };
        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
    }
}

function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

if (drop.addEventListener) {
    drop.addEventListener('dragenter', handleDragover, false);
    drop.addEventListener('dragover', handleDragover, false);
    drop.addEventListener('drop', handleDrop, false);
}


var xlf = document.getElementById('xlf');

function handleFile(e) {
    rABS = document.getElementsByName("userabs")[0].checked;
    use_worker = document.getElementsByName("useworker")[0].checked;
    var files = e.target.files;
    var f = files[0]; {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
            var data = e.target.result;
            if (use_worker) {
                xw(data, process_wb);
            } else {
                var wb;
                if (rABS) {
                    wb = X.read(data, {
                        type: 'binary'
                    });
                } else {
                    var arr = fixdata(data);
                    wb = X.read(btoa(arr), {
                        type: 'base64'
                    });
                }
                process_wb(wb);
            }
        };
        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
    }
}

if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

/*******************************************************************************************************************/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36810333-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
