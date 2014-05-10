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

			properties.modules = ['a', 'b', 'c', 'd'];

			properties.options = ['option1', 'option2', 'option3'];


			this.archData = {
				el: 'eval:this',
				option1: 'root-1',
				option2: 'root-2',
				option3: 'require:/path-to-bananas',
				a: 'require:/path-to-module-a(el)',
				b: 'require:/path-to-module-b({ el, dock:option1, option2 })',
				c: 'require:/path-to-module-c({ el, option2 }, option3)'
			};

		});

		it('root', function () {


			var $root = this.$root;

			var root = $root.scope('[data-arch]', {
				// meta-data options

				// the data prefix
				prefix: 'arch',
				// parser
				parse: function (v) {
					return 'parsed-' + v;
				}
			});

			root.evaluate(this.properties.modules, { format: 'object'})
				.should.eql({
					a: 'parsed-require:/path-to-module-a(el)',
					b: 'parsed-require:/path-to-module-b({ el, dock:option1, option2 })',
					c: 'parsed-require:/path-to-module-c({ el, option2 }, option3)',
					d: undefined
				});

			root.evaluate(this.properties.options, { format: 'object' })
				.should.eql({
					option1: 'parsed-root-1',
					option2: 'parsed-root-2',
					option3: 'parsed-require:/path-to-bananas'
				});

		});

		it('branch-1', function () {

			var branch1 = $('#branch-1').scope('[data-arch]', {
				// meta-data options

				// the data prefix
				prefix: 'arch',
				// parser
				parse: function (v) {
					return 'parsed-' + v;
				}
			});

			branch1.evaluate(this.properties.modules, { format: 'object' })
				.should.eql({
					a: 'parsed-require:/path-to-module-a(el)',
					b: 'parsed-require:/path-to-module-b({ el, dock:option1, option2 })',
					c: 'parsed-require:/path-to-module-c({ el, option2 }, option3)',
					d: 'parsed-require:/path-to-module-d(option1, { el, option2 }, option3)'
				});

			branch1.evaluate(this.properties.options, { format: 'object' })
				.should.eql({
					option1: 'parsed-branch-1-1',
					option2: 'parsed-root-2',
					option3: 'parsed-require:/path-to-third-option',
				});
		});

		it('branch-1-1', function () {

			var branch11 = $('#branch-1-1').scope('[data-arch]', {
				// meta-data options

				// the data prefix
				prefix: 'arch',
				// parser
				parse: function (v) {
					return 'parsed-' + v;
				}
			});

			branch11.evaluate(this.properties.modules, { format: 'object' })
				.should.eql({
					a: 'parsed-require:/path-to-module-a(el)',
					b: 'parsed-require:/path-to-module-b({ el, dock:option1, option2 })',
					c: 'parsed-REMOVED',
					d: 'parsed-require:/path-to-module-d(option1, { el, option2 }, option3)'
				});

			branch11.evaluate(this.properties.options, { format: 'object' })
				.should.eql({
					option1: 'parsed-branch-1-1',
					option2: 'parsed-root-2',
					option3: 'parsed-branch-1-1-3',
				});
		});
	});
});
