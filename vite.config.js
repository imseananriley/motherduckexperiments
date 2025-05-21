
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      // use "credentialless" if you can’t control every third-party asset
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});