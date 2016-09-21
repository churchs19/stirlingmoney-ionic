/**
 * angular2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.1.4
 * @link https://github.com/alenny/angular2-adal#readme
 * @license MIT
 */
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
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var adalLib = require('adal');
var AdalService = (function () {
    function AdalService() {
        this.oauthData = {
            isAuthenticated: false,
            userName: '',
            loginError: '',
            profile: {}
        };
    }
    AdalService.prototype.init = function (configOptions) {
        if (!configOptions) {
            throw new Error('You must set config, when calling init.');
        }
        // redirect and logout_redirect are set to current location by default
        var existingHash = window.location.hash;
        var pathDefault = window.location.href;
        if (existingHash) {
            pathDefault = pathDefault.replace(existingHash, '');
        }
        configOptions.redirectUri = configOptions.redirectUri || pathDefault;
        configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
        // create instance with given config
        this.adalContext = new adalLib.AuthenticationContext(configOptions);
        // loginresource is used to set authenticated status
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    Object.defineProperty(AdalService.prototype, "config", {
        get: function () {
            return this.adalContext.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdalService.prototype, "userInfo", {
        get: function () {
            return this.oauthData;
        },
        enumerable: true,
        configurable: true
    });
    AdalService.prototype.login = function () {
        this.adalContext.login();
    };
    AdalService.prototype.loginInProgress = function () {
        return this.adalContext.loginInProgress();
    };
    AdalService.prototype.logOut = function () {
        this.adalContext.logOut();
    };
    AdalService.prototype.handleWindowCallback = function () {
        var hash = window.location.hash;
        if (this.adalContext.isCallback(hash)) {
            var requestInfo = this.adalContext.getRequestInfo(hash);
            this.adalContext.saveTokenFromHash(requestInfo);
            if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
                this.updateDataFromCache(this.adalContext.config.loginResource);
            }
            else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
            }
        }
    };
    AdalService.prototype.getCachedToken = function (resource) {
        return this.adalContext.getCachedToken(resource);
    };
    AdalService.prototype.acquireToken = function (resource) {
        return Observable_1.Observable.bindCallback(function (cb) {
            this.adalContext.acquireToken(resource, function (error, tokenOut) {
                if (error) {
                    this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
                    cb(null);
                }
                else {
                    cb(tokenOut);
                }
            });
        });
    };
    AdalService.prototype.getUser = function () {
        return Observable_1.Observable.bindCallback(function (cb) {
            this.adalContext.getUser(function (error, user) {
                if (error) {
                    this.adalContext.error('Error when getting user', error);
                    cb(null);
                }
                else {
                    cb(user);
                }
            });
        })();
    };
    AdalService.prototype.clearCache = function () {
        this.adalContext.clearCache();
    };
    AdalService.prototype.clearCacheForResource = function (resource) {
        this.adalContext.clearCacheForResource(resource);
    };
    AdalService.prototype.info = function (message) {
        this.adalContext.info(message);
    };
    AdalService.prototype.verbose = function (message) {
        this.adalContext.verbose(message);
    };
    AdalService.prototype.updateDataFromCache = function (resource) {
        var token = this.adalContext.getCachedToken(resource);
        this.oauthData.isAuthenticated = token !== null && token.length > 0;
        var user = this.adalContext.getCachedUser();
        if (user) {
            this.oauthData.userName = user.userName;
            this.oauthData.profile = user.profile;
            this.oauthData.loginError = this.adalContext.getLoginError();
        }
        else {
            this.oauthData.userName = '';
            this.oauthData.profile = {};
            this.oauthData.loginError = '';
        }
    };
    ;
    AdalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AdalService);
    return AdalService;
}());
exports.AdalService = AdalService;
//# sourceMappingURL=adal.service.js.map