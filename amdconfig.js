require.config({
	urlArgs: 'bust=0.9013647369574755',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'jquery-scope': 'index',
		jquery: '../bower_components/jquery/dist/jquery',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'jquery-prefixed-data': '../bower_components/jquery-prefixed-data/built/jquery-prefixed-data',
		scope: '../bower_components/scope/built/scope',
		subject: '../bower_components/subject/built/subject',
		'jquery-meta-data': '../bower_components/jquery-meta-data/built/jquery-meta-data'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
