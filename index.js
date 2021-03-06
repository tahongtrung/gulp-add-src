/* gulp-add-src / v0.1.1 / (c) 2014 Uri Shaked / MIT Licence */

'use strict';
var through = require('through2');
var streamqueue = require('streamqueue');
var es = require('event-stream');
var vinyl = require('vinyl-fs');

function prepend() {
    var pass = through.obj();
    return es.duplex(pass, streamqueue({ objectMode: true }, vinyl.src.apply(vinyl.src, arguments), pass));
}

function append() {
	var pass = through.obj();
	return es.duplex(pass, streamqueue({ objectMode: true }, pass, vinyl.src.apply(vinyl.src, arguments)));
}

var addSrc = function () {
	var pass = through.obj();
	return es.duplex(pass, es.merge(vinyl.src.apply(vinyl.src, arguments), pass));
};

addSrc.append  = append;
addSrc.prepend = prepend;

module.exports = addSrc;
