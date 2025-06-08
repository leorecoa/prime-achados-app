/// <reference types="vite/client" />

declare module '@vitejs/plugin-react-swc' {
  import { Plugin } from 'vite';
  export default function react(): Plugin;
}

declare module 'lovable-tagger' {
  export function componentTagger(): any;
}