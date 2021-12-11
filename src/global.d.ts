import oSpace from './space';

declare module 'vue' {
  export interface GlobalComponents {
    oSpace: typeof oSpace;
  }
}
