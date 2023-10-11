import { environment } from '../../environments/environment';

export default {
  oidc: {
    clientId: environment.clientId,
    issuer: environment.issuer,
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
