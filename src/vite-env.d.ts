/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
