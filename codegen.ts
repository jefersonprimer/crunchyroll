// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://backend-crunchyroll-production.up.railway.app/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
