/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COINS_API_URL: string;
  readonly VITE_COIN_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
