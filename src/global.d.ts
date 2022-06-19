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
import oTable from './table'
import oOmit from './omit'
import oOmitItem from './omit-item'
import oUpload from './upload'
import oCountTo from './count-to'
import oDataPagination from './data-pagination'
import oPullRefresh from './pull-refresh'
import oList from './list'
import oSpin from './spin'
import oInput from './input'
import oImagePreview from './image-preview'
import oSlider from './slider'
import oInputNumber from './input-number'
import oCascader from './cascader'
import oSwitch from './switch'
import oTabs from './tabs'
import oTab from './tab'
import oCarousel from './carousel'
import oRate from './rate'
import oTimeline from './timeline'
import oTimelineItem from './timeline-item'
import oResult from './result'
import oNoticeBar from './notice-bar'
import oContain from './contain'
import oBackTop from './back-top'
import oAspectRatio from './aspect-ratio'
import oScrollBar from './scroll-bar'
import oMasonry from './masonry'
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
        oTable: typeof oTable;
        oOmit: typeof oOmit;
        oOmitItem: typeof oOmitItem;
        oUpload: typeof oUpload;
        oCountTo: typeof oCountTo;
        oDataPagination: typeof oDataPagination;
        oPullRefresh: typeof oPullRefresh;
        oList: typeof oList;
        oSpin: typeof oSpin;
        oInput: typeof oInput;
        oImagePreview: typeof oImagePreview;
        oSlider: typeof oSlider;
        oInputNumber: typeof oInputNumber;
        oCascader: typeof oCascader;
        oSwitch: typeof oSwitch;
        oTabs: typeof oTabs;
        oTab: typeof oTab;
        oCarousel: typeof oCarousel;
        oRate: typeof oRate;
        oTimeline: typeof oTimeline;
        oTimelineItem: typeof oTimelineItem;
        oResult: typeof oResult;
        oNoticeBar: typeof oNoticeBar;
        oContain: typeof oContain;
        oBackTop: typeof oBackTop;
        oAspectRatio: typeof oAspectRatio;
        oScrollBar: typeof oScrollBar;
        oMasonry: typeof oMasonry;
    }
    interface Vue {
        $dialog: typeof $dialog,
        $toast: typeof $toast
    }
}
