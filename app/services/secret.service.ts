import {Injectable} from '@angular/core';

@Injectable()
export class SecretService {
    public get adalConfig(): any {
        return {
            tenant: 'shaneschurch.onmicrosoft.com',
            clientId: '7fc91045-99b4-4c0d-8aae-43c100eb0c34',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/'
        };
    }
}
