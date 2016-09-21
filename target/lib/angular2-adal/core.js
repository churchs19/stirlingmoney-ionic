"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * angular2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.1.4
 * @link https://github.com/alenny/angular2-adal#readme
 * @license MIT
 */
var core_1 = require('@angular/core');
var services_1 = require('./services');
__export(require('./services'));
exports.ANGULAR2_ADAL_PROVIDERS = [
    core_1.provide(services_1.AdalService, { useClass: services_1.AdalService })
];
//# sourceMappingURL=core.js.map