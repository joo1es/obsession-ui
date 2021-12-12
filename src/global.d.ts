import oSpace from './space'
import oGrid from './grid'
import oGridItem from './grid-item'

declare module 'vue' {
  export interface GlobalComponents {
    oSpace: typeof oSpace;
    oGird: typeof oGrid;
    oG: typeof oGrid;
    oGridItem: typeof oGridItem;
    oGi: typeof oGridItem;
  }
}
