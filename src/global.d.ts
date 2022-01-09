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
import oActionSheet from './action-sheet'
import oButtonGroup from './button-group'
import oBadge from './badge'
import oTag from './tag'
import oTagInput from './tag-input'
import oAvatar from './avatar'
import oBreadcrumb from './breadcrumb'
import oLayout from './layout'
import oLayoutAside from './layout-aside'
import oLayoutContent from './layout-content'
import oPopDialog from './pop-dialog'
import oVirtualList from './virtual-list'
import oProgress from './progress'
import oRadio from './radio'
import oCheckbox from './checkbox'
import oCheckboxGroup from './checkbox-group'
import oRadioGroup from './radio-group'
import oImage from './image'
import oTree from './tree'
import oXScroll from './x-scroll'
import oComment from './comment'
import oPagination from './pagination'
import $dialog from './dialog'
import $toast from './toast'

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
        oPagination: typeof oPagination;
        oEllipsis: typeof oEllipsis;
        oScrollList: typeof oScrollList;
        oStatistic: typeof oStatistic;
        oOverlay: typeof oOverlay;
        oModal: typeof oModal;
        oPopConfirm: typeof oPopConfirm;
        oDropdown: typeof oDropdown;
        oActionSheet: typeof oActionSheet;
        oButtonGroup: typeof oButtonGroup;
        oBadge: typeof oBadge;
        oTag: typeof oTag;
        oTagInput: typeof oTagInput;
        oAvatar: typeof oAvatar;
        oBreadcrumb: typeof oBreadcrumb;
        oLayout: typeof oLayout;
        oLayoutAside: typeof oLayoutAside;
        oLayoutContent: typeof oLayoutContent;
        oPopDialog: typeof oPopDialog;
        oVirtualList: typeof oVirtualList;
        oProgress: typeof oProgress;
        oRadio: typeof oRadio;
        oRadioGroup: typeof oRadioGroup;
        oCheckbox: typeof oCheckbox;
        oCheckboxGroup: typeof oCheckboxGroup;
        oImage: typeof oImage;
        oTree: typeof oTree;
        oXScroll: typeof oXScroll;
        oComment: typeof oComment;
    }
    interface Vue {
        $dialog: typeof $dialog,
        $toast: typeof $toast
    }
}
