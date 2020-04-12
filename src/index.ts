import { createHashes } from './lib/cert';

export const Name = (name: string) => `Hello ${name}`;

export function getOCSPHashes(certPath: string, issuerCertPath: string, algo: string = 'sha256', disableFilePathValidation: boolean = false) {
  return createHashes(certPath, issuerCertPath, algo, disableFilePathValidation);
}
