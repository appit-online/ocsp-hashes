export function createHashes(certificatePath: any, issuerCertificatePath: any, algo: string, disableValidation: boolean) {
    if(!disableValidation){
      certificatePath = certificatePath.replace(/[^0-9A-Za-z\.\\\/\s-_]/g,'');
      issuerCertificatePath = issuerCertificatePath.replace(/[^0-9A-Za-z\\\.\/\s-_]/g,'');
    }
    algo = algo.toLowerCase();
    algo = algo.replace(/[^0-9a-z]/g,'');

    const spawn = require('child_process').spawn;
    const p12Import = spawn('openssl', ['ocsp', '-issuer', issuerCertificatePath, '-no_nonce', '-' + algo, '-cert', certificatePath, '-text']);

    const certID = {
      hashAlgorithm: '',
      issuerNameHash: '',
      issuerKeyHash: '',
      serialNumber: ''
    };
  return generateCertificateInfo(p12Import, certID, algo);

}


function generateCertificateInfo(p12Import: any, certID: any, algo: string) {
  return new Promise((resolve, reject) => {

    p12Import.stdout.on('data', (data: any) => {
      const regNameHash = new RegExp('Issuer Name Hash:(.|\\n)*(?=(\\s)*Issuer)');
      const regKeyHash = new RegExp('Issuer Key Hash:(.|\\n)*(?=(\\s)*Ser)');
      const regSNHash = new RegExp('Serial Number:\\s.*?\\n');

      certID.hashAlgorithm = algo;
      certID.issuerNameHash = extractValue(regNameHash, `${data}`);
      certID.issuerKeyHash = extractValue(regKeyHash, `${data}`);
      certID.serialNumber = extractValue(regSNHash, `${data}`);

      resolve(certID);
    });

    p12Import.stderr.on('data', (data: any) => {
      reject(`stderr: ${data}`);
    });

    p12Import.on('close', (code: any) => {
      // console.log(`process exited with exit code ${code}`);
    });
  });
}

function extractValue(regex: RegExp, data: any){
  try{
    if(data != null){
      let value = data.match(regex)[0];

      if(value && value.length > 0){
        value = value.trim();
      }

      if(value.indexOf(':') === -1){
        return '';
      }else{
        value = value.split(':')[1].trim();
        value = value.replace(/[^0-9A-Z]/g,'');
        return value;
      }
    }
  }catch (e) {
    return ''
  }
}
