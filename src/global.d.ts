import oSpace from './space'
import oGrid from './grid'
import oGridItem from './grid-item'
import oIcon from './icon'
import oButton from './button'
import CollapseTransition from './collapse-transition'
import oCollapse from './collapse'
import oCollapseItem from './collapse-item'
import oPopover from './popover'
import oTooltip from './tooltip'
import oMenu from './menu'
import oEllipsis from './ellipsis'
import oScrollList from './scroll-list'
import oStatistic from './statistic'
import oOverlay from './overlay'
import oModal from './modal'
import oPopConfirm from './pop-confirm'
import oDropdown from './dropdown'
import $dialog from './dialog'

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
        oPopover: typeof oPopover;
        oTooltip: typeof oTooltip;
        oMenu: typeof oMenu;
        oEllipsis: typeof oEllipsis;
        oScrollList: typeof oScrollList;
        oStatistic: typeof oStatistic;
        oOverlay: typeof oOverlay;
        oModal: typeof oModal;
        oPopConfirm: typeof oPopConfirm;
        oDropdown: typeof oDropdown;
    }
    interface Vue {
        $dialog: typeof $dialog
    }
}
