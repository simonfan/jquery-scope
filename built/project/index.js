//     jquery-scope
//     (c) simonfan
//     jquery-scope is licensed under the MIT terms.

define(["require","exports","module","jquery","lodash","scope","jquery-meta-data"],function(e,t,n){function a(e,t,n){var r,i=e.metaData(n),o=e.parent().closest(t);if(o.length>0){var f=a(o,t,n);r=f.create(i),e.data(u.dataKey,r)}else r=e.data(u.dataKey),r||(r=s(i),e.data(u.dataKey,r));return r}var r=e("jquery"),i=e("lodash"),s=e("scope"),o=e("jquery-meta-data"),u={dataKey:"scope"};r.scope=function(t){i.assign(u,t)},r.prototype.scope=function(e,t){return t=t||{},a(this,e,t)}});