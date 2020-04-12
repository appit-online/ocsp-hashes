# [OCSP-hashes generator: Node.js](https://github.com/appit-online/ocsp-hashes)

Creates ocsp hashes for certificate revocation check from pem encoded certificates.

##Publications:

https://blog.appit-online.de/publications/


**Table of contents:**


* [Quickstart](#quickstart)

  * [Installing the library](#installing-the-library)
  * [Using the library](#using-the-library)
* [License](#license)

## Quickstart

### Installing the library

```bash
npm install ocsp-hashes --save
```


### Using the library

```javascript
import * as ocspHashes from 'ocsp-hashes';

/**
 * Given a pem certificate file and issuer cert file.
 * @param {string} certPath The path to a certificate file.
 * @param {string} issuerCertPath The path to a issuer certificate file.
 * @param {string} hashingAlgorithm - default sha256.
 * @param {boolean} disableFilePathValidations - default false - only for development or if you know what you are doing.
 */
const ocspHashes = await ocspHashes.getOCSPHashes(certPath, issuerCertPath, hashingAlgorithm, disableFilePathValidations);
console.log('The ocsp object:');
console.log(ocspHashes);

const ocspHashes = await ocspHashes.getOCSPHashes(certPath, issuerCertPath, hashingAlgorithm);
console.log('The ocsp object:');
console.log(ocspHashes);

const ocspHashes = await ocspHashes.getOCSPHashes(certPath, issuerCertPath);
console.log('The ocsp object:');
console.log(ocspHashes);


/*
{
        "hashAlgorithm": "sha256",
        "issuerNameHash": "C3898FF2BAFB7FD5F83CE0A25AC731A8D78898874FF17EA3EC01FAEF11F1E7B8",
        "issuerKeyHash": "7B6C1816B110889887019E8AF43267675B95D9EAC75A4476A0C259EB090EF705",
        "serialNumber": "256E8AF6A2AD1F14E69843888F5D78C1"
}
*/

```

## Supported Node.js Versions

Our client libraries follow the [Node.js release schedule](https://nodejs.org/en/about/releases/).
Libraries are compatible with all current _active_ and _maintenance_ versions of
Node.js.

## License

Apache Version 2.0

See [LICENSE](https://github.com/appit-online/ocsp-hashes/blob/master/LICENSE)
