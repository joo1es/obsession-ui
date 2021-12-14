import { withInstall } from '../utils'
import _Tooltip from './Tooltip'

const Tooltip = withInstall<typeof _Tooltip>(_Tooltip)

export default Tooltip
export { tooltipProps } from './Tooltip'
export type { TooltipProps } from './Tooltip'
