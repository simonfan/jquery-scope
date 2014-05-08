//     jquery-scope
//     (c) simonfan
//     jquery-scope is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module jquery-scope
 */

define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery'),
		_ = require('lodash'),
		scope = require('scope');

	var _opt = {
		dataKey: 'scope',
	};

	function jqScope(el, parentSelector) {

		// variable to be returned.
		var localScope;

		// the local data
		var localData = el.data();

		// get the parent
		var parentEl = el.parent().closest(parentSelector);

		if (parentEl.length > 0) {
			// there is a parent

			var parentScope = jqScope(parentEl, parentSelector);

			// create sub scope from the parent
			localScope = parentScope.create(localData);

			// store
			el.data(_opt.dataKey, localScope);

		} else {
			// no parent.
			// this is root

			// check if there is a _opt.dataKey
			localScope = el.data(_opt.dataKey);

			if (!localScope) {
				// the local scope has not been created yet

				// create
				localScope = scope(localData);

				// and store
				el.data(_opt.dataKey, localScope);
			}

		}

		// return.
		return localScope;
	}


	$.scope = function jqScopeOptions(options) {
		_.assign(_opt, options);
	};

	$.prototype.scope = function (parentSelector) {
		return jqScope(this, parentSelector);
	};
});
