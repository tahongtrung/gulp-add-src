/* global describe, it */
'use strict';

var assert = require('assert');
var join = require('path').join;
var gulp = require('gulp');
var addsrc = require('./index');

describe('gulp-add-src', function () {
	it('should add files to an existing stream', function (done) {
		var stream = gulp.src(['index.js', 'test.js'])
			.pipe(addsrc(['package.json', 'README.md']));

		var allFiles = [];
		stream.on('error', done);
		stream.on('data', function (file) {
			allFiles.push(file.path);
		});
		stream.on('end', function() {
			// they just need to be the same, order doesn't matter!
			assert.deepEqual(allFiles.sort(), [
				join(__dirname, 'index.js'),
				join(__dirname, 'test.js'),
				join(__dirname, 'package.json'),
				join(__dirname, 'README.md')
			].sort());
			done();
		});
	});

	it('should append files to an existing stream in order', function (done) {
		var stream = gulp.src(['index.js', 'test.js'])
			.pipe(addsrc.append(['package.json', 'README.md']));

		var allFiles = [];
		stream.on('error', done);
		stream.on('data', function (file) {
			allFiles.push(file.path);
		});
		stream.on('end', function() {
			// they just need to be the same, order doesn't matter!
			assert.deepEqual(allFiles, [
				join(__dirname, 'index.js'),
				join(__dirname, 'test.js'),
				join(__dirname, 'package.json'),
				join(__dirname, 'README.md')
			]);
			done();
		});
	});

	it('should append files to an existing stream in order', function (done) {
		var stream = gulp.src(['index.js', 'test.js'])
			.pipe(addsrc.append(['package.json', 'README.md']));

		var allFiles = [];
		stream.on('error', done);
		stream.on('data', function (file) {
			allFiles.push(file.path);
		});
		stream.on('end', function() {
			// they just need to be the same, order doesn't matter!
			assert.deepEqual(allFiles.sort(), [
				join(__dirname, 'package.json'),
				join(__dirname, 'README.md'),
				join(__dirname, 'index.js'),
				join(__dirname, 'test.js')
			].sort());
			done();
		});
	});
});
