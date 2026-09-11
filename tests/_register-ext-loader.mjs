// Bootstrap para registrar `_ext-resolver-loader.mjs` sin usar el flag `--experimental-loader`
// (deprecado). Uso: `node --import ./tests/_register-ext-loader.mjs tests/province-profile-model-check.mjs`.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('./_ext-resolver-loader.mjs', pathToFileURL('./tests/'));
