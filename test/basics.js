(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'jquery-scope',
		// dependencies for the test
		deps = [mod, 'should', 'text!/test/fixture.html'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(JqueryScope, should, fixture) {
	'use strict';

	describe('JqueryScope basics', function () {
		beforeEach(function () {

			var $root = this.$root = $(fixture).appendTo($('body'));


			// properties to be checked
			var properties = this.properties = {};

			properties.require = ['archRequireA', 'archRequireB', 'archRequireC', 'archRequireD'];
			properties.invoke = ['archA', 'archB', 'archC', 'archD'];

			properties.optionsB = ['archBOpt1', 'archBOpt2', 'archBOpt3'];
			properties.optionsC = ['archCOpt1', 'archCOpt2'];
			properties.optionsD = ['archDOpt1', 'archDOpt2', 'archDOpt3'];

		});

		it('root', function () {



			var root = $('#root').scope('[data-arch]');

			root.evaluate(this.properties.require, { to: 'object'})
				.should.eql({
					archRequireA: '/path-to-module-a',
					archRequireB: '/path-to-module-b',
					archRequireC: '/path-to-module-c',
					archRequireD: undefined
				});

			root.evaluate(this.properties.invoke, { to: 'object' })
				.should.eql({
					archA: 'root-a',
					archB: '',
					archC: undefined,
					archD: undefined
				});

			root.evaluate(this.properties.optionsB, { to: 'object' })
				.should.eql({
					archBOpt1: 'root-b-v1',
					archBOpt2: 'root-b-v2',
					archBOpt3: 'root-b-v3'
				});

		});

		it('branch-1', function () {

			var branch1 = $('#branch-1').scope('[data-arch]');

			branch1.evaluate(this.properties.require, { to: 'object' })
				.should.eql({
					archRequireA: '/path-to-module-a',
					archRequireB: '/path-to-module-b',
					archRequireC: '/path-to-module-c',
					archRequireD: undefined
				});

			branch1.evaluate(this.properties.invoke, { to: 'object' })
				.should.eql({
					archA: 'branch-1-a',
					archB: '',
					archC: '',
					archD: undefined
				});

			branch1.evaluate(this.properties.optionsB, { to: 'object' })
				.should.eql({
					archBOpt1: 'branch-1-b-v1',		// own
					archBOpt2: 'root-b-v2',			// inherited
					archBOpt3: 'branch-1-b-v3'		// own
				});

			branch1.evaluate(this.properties.optionsC, { to: 'object' })
				.should.eql({
					archCOpt1: 'branch-1-c-v1',		// own
					archCOpt2: 'branch-1-c-v2',		// own
				});
		});

		it('branch-1-1', function () {

			var branch11 = $('#branch-1-1').scope('[data-arch]');

			branch11.evaluate(this.properties.require, { to: 'object' })
				.should.eql({
					archRequireA: '/path-to-module-a',
					archRequireB: '/path-to-module-b',
					archRequireC: '/path-to-module-c',
					archRequireD: undefined
				});

			branch11.evaluate(this.properties.optionsC, { to: 'object' })
				.should.eql({
					archCOpt1: 'branch-1-c-v1',		// own
					archCOpt2: 'branch-1-c-v2',		// own
				});
		});
	});
});
