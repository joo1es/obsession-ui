import { withInstall } from '../utils'
import _CollapseItem from './CollapseItem'

export const CollapseItem = withInstall<typeof _CollapseItem>(_CollapseItem)

export default CollapseItem
export { collapseItemProps } from './CollapseItem'
export type { CollapseItemProps } from './CollapseItem'
