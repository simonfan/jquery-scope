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
		scope = require('scope'),
		jqPrefixedData = require('jquery-meta-data');

	var _opt = {
		dataKey: 'scope',
	};

	function jqScope(el, parentSelector, metaDataOptions) {

		// [0] variable to be returned.
		var localScope;

		// [1] get the local data
		var localData = el.metaData(metaDataOptions);

		// [2] get the parent
		var parentEl = el.parent().closest(parentSelector);

		if (parentEl.length > 0) {
			// [2.1] there is a parent

			// [2.1.1] get or create (if absent) the parent scopr object.
			var parentScope = jqScope(parentEl, parentSelector, metaDataOptions);

			// [2.1.2] create sub scope from the parent
			localScope = parentScope.create(localData);

			// [2.1.3] store
			el.data(_opt.dataKey, localScope);

		} else {
			// [2.2] no parent.
			// this is root

			// [2.2.1] check if there is a value stored at _opt.dataKey
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

	/**
	 * Sets scope options
	 *
	 * @method scope
	 * @static
	 * @param options {Object}
	 */
	$.scope = function jqScopeOptions(options) {
		_.assign(_opt, options);
	};

	/**
	 * Evaluates scope.
	 *
	 * @method scope
	 * @param parentSelector {jq-selector String}
	 * @param [metaDataOptions] {Object}
	 */
	$.prototype.scope = function (parentSelector, metaDataOptions) {

		metaDataOptions = metaDataOptions || {};

		return jqScope(this, parentSelector, metaDataOptions);
	};
});
