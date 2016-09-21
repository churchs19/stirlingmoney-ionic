"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SecretService = (function () {
    function SecretService() {
    }
    Object.defineProperty(SecretService.prototype, "adalConfig", {
        get: function () {
            return {
                tenant: 'shaneschurch.onmicrosoft.com',
                clientId: '7fc91045-99b4-4c0d-8aae-43c100eb0c34',
                redirectUri: window.location.origin + '/',
                postLogoutRedirectUri: window.location.origin + '/'
            };
        },
        enumerable: true,
        configurable: true
    });
    SecretService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SecretService);
    return SecretService;
}());
exports.SecretService = SecretService;
//# sourceMappingURL=secret.service.js.map