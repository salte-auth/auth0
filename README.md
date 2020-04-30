<h3 align="center">
	NOTE: This repository is currently a work in progress and shouldn't be used!
</h3>

<h2 align="center">
  <div>
    <a href="https://github.com/salte-auth/auth0">
      <img height="180px" src="https://raw.githubusercontent.com/salte-auth/logos/master/images/logo.svg?sanitize=true">
      <br>
      <br>
      <img height="50px" src="https://raw.githubusercontent.com/salte-auth/logos/master/images/%40salte-auth/auth0.svg?sanitize=true">
    </a>
  </div>
</h2>

<h3 align="center">
	A Salte Auth provider for authenticating with Auth0!
</h3>

<p align="center">
	<strong>
		<a href="https://salte-auth.github.io/salte-auth">Docs</a>
		•
		<a href="https://salte-auth-demo.glitch.me">Demo</a>
	</strong>
</p>

<div align="center">

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Downloads][npm-downloads-image]][npm-url]
  [![Travis][travis-ci-image]][travis-ci-url]
  [![Coveralls][coveralls-image]][coveralls-url]

  [![semantic-release][semantic-release-image]][semantic-release-url]

</div>

## Install

```sh
$ npm install @salte-auth/auth0
```

## Usage

```js
import { SalteAuth } from '@salte-auth/salte-auth';
import { Auth0 } from '@salte-auth/auth0';
import { Redirect } from '@salte-auth/redirect';

/* 
 * Feel free to try out Salte Auth with this configuration!
 * 
 * It should work with the following domains:
 * - glitch.com
 * - localhost:8081
 */
const auth = new SalteAuth({
  providers: [
    new Auth0({
      url: 'https://salte-os.auth0.com',
      clientID: '9JTBXBREtckkFHTxTNBceewrnn7NeDd0'
    })
  ],

  handlers: [
    new Redirect({
      default: true
    })
  ]
});

auth.login('auth0');
```

[npm-version-image]: https://img.shields.io/npm/v/@salte-auth/auth0.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@salte-auth/auth0.svg?style=flat
[npm-url]: https://npmjs.org/package/@salte-auth/auth0

[travis-ci-image]: https://img.shields.io/travis/com/salte-auth/auth0/master.svg?style=flat
[travis-ci-url]: https://travis-ci.com/salte-auth/auth0

[coveralls-image]: https://img.shields.io/coveralls/salte-auth/auth0/master.svg
[coveralls-url]: https://coveralls.io/github/salte-auth/auth0?branch=master

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: https://commitizen.github.io/cz-cli/

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
