import { SalteAuth } from '@salte-auth/salte-auth';
import { Redirect } from '@salte-auth/redirect';
import { Auth0 } from '../src/auth0';

const auth = new SalteAuth({
  providers: [
    new Auth0({
      url: 'https://salte-os.auth0.com',

      clientID: '6HXbmGnu4145AE0jLZO1Q01WX53cLI48',
      responseType: 'id_token',

      routes: true
    })
  ],

  handlers: [
    new Redirect({
      default: true
    })
  ]
});

const button = document.createElement('button');
button.innerHTML = `Login`;
button.addEventListener('click', () => {
  auth.login('auth0');
});

document.body.appendChild(button);
