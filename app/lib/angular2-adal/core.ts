/**
 * angular2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.1.4
 * @link https://github.com/alenny/angular2-adal#readme
 * @license MIT
 */
import {provide} from '@angular/core';
import {AdalService} from './services';

export * from './services';

export const ANGULAR2_ADAL_PROVIDERS: any[] = [
    provide(AdalService, {useClass: AdalService})
];