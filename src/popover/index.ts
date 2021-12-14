import { withInstall } from '../utils'
import _Popover from './Popover'

const Popover = withInstall<typeof _Popover>(_Popover)

export default Popover
export { popoverProps, popoverEmits } from './Popover'
export type {
    PopoverProps,
    PopoverTrigger,
    PopoverPlacement,
    PopoverEmits,
} from './Popover'
