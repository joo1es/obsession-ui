import oSpace from './space'
import oGrid from './grid'
import oGridItem from './grid-item'
import oIcon from './icon'
import oButton from './button'
import CollapseTransition from './collapse-transition'
import oCollapse from './collapse'
import oCollapseItem from './collapse-item'

declare module 'vue' {
  export interface GlobalComponents {
    oSpace: typeof oSpace;
    oGird: typeof oGrid;
    oG: typeof oGrid;
    oGridItem: typeof oGridItem;
    oGi: typeof oGridItem;
    oIcon: typeof oIcon;
    oButton: typeof oButton;
    CollapseTransition: typeof CollapseTransition;
    oCollapse: typeof oCollapse;
    oCollapseItem: typeof oCollapseItem;
  }
}
