import { withInstall } from '../utils'
import _Collapse from './Collapse'

export const Collapse = withInstall<typeof _Collapse>(_Collapse)

export default Collapse
export { collapseProps, collapseEmits } from './Collapse'
export type { CollapseProps, CollapseEmits, CollapseSupport } from './Collapse'
