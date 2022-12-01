import type oSpace from './space'
import type oGrid from './grid'
import type oGridItem from './grid-item'
import type oIcon from './icon'
import type oButton from './button'
import type CollapseTransition from './collapse-transition'
import type oCollapse from './collapse'
import type oCollapseItem from './collapse-item'
import type oPopover from './popover'
import type oTooltip from './tooltip'
import type oMenu from './menu'
import type oEllipsis from './ellipsis'
import type oScrollList from './scroll-list'
import type oStatistic from './statistic'
import type oOverlay from './overlay'
import type oModal from './modal'
import type oPopConfirm from './pop-confirm'
import type oDropdown from './dropdown'
import type oActionSheet from './action-sheet'
import type oButtonGroup from './button-group'
import type oBadge from './badge'
import type oTag from './tag'
import type oTagInput from './tag-input'
import type oAvatar from './avatar'
import type oBreadcrumb from './breadcrumb'
import type oLayout from './layout'
import type oLayoutAside from './layout-aside'
import type oLayoutContent from './layout-content'
import type oPopDialog from './pop-dialog'
import type oVirtualList from './virtual-list'
import type oProgress from './progress'
import type oRadio from './radio'
import type oCheckbox from './checkbox'
import type oCheckboxGroup from './checkbox-group'
import type oRadioGroup from './radio-group'
import type oImage from './image'
import type oTree from './tree'
import type oXScroll from './x-scroll'
import type oComment from './comment'
import type oPagination from './pagination'
import type oTable from './table'
import type oOmit from './omit'
import type oOmitItem from './omit-item'
import type oUpload from './upload'
import type oCountTo from './count-to'
import type oDataPagination from './data-pagination'
import type oPullRefresh from './pull-refresh'
import type oList from './list'
import type oSpin from './spin'
import type oInput from './input'
import type oImagePreview from './image-preview'
import type oSlider from './slider'
import type oInputNumber from './input-number'
import type oCascader from './cascader'
import type oSwitch from './switch'
import type oTabs from './tabs'
import type oTab from './tab'
import type oCarousel from './carousel'
import type oRate from './rate'
import type oTimeline from './timeline'
import type oTimelineItem from './timeline-item'
import type oResult from './result'
import type oNoticeBar from './notice-bar'
import type oContain from './contain'
import type oBackTop from './back-top'
import type oAspectRatio from './aspect-ratio'
import type oScrollBar from './scroll-bar'
import type oMasonry from './masonry'
import type oSegmented from './segmented'
import type oRotateAlbum from './rotate-album'
import type oRotateAlbum3d from './rotate-album-3d'
import type $dialog from './dialog'
import type $toast from './toast'

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
        oSegmented: typeof oSegmented;
        oRotateAlbum: typeof oRotateAlbum;
        oRotateAlbum3d: typeof oRotateAlbum3d;
    }
    interface Vue {
        $dialog: typeof $dialog,
        $toast: typeof $toast
    }
}
