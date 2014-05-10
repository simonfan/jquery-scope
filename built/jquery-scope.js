//     jquery-scope
//     (c) simonfan
//     jquery-scope is licensed under the MIT terms.

define("jquery-scope",["require","exports","module","jquery","lodash","scope","jquery-meta-data"],function(e){function a(e,t,r){var n,d=e.metaData(r),u=e.parent().closest(t);if(u.length>0){var c=a(u,t,r);n=c.create(d),e.data(s.dataKey,n)}else n=e.data(s.dataKey),n||(n=o(d),e.data(s.dataKey,n));return n}var t=e("jquery"),r=e("lodash"),o=e("scope"),s=(e("jquery-meta-data"),{dataKey:"scope"});t.scope=function(e){r.assign(s,e)},t.prototype.scope=function(e,t){return t=t||{},a(this,e,t)}});