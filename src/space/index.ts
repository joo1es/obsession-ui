import { withInstall } from '../utils'
import _Space from './Space'

const oSpace = withInstall<typeof _Space>(_Space)

export default oSpace
export { oSpace }
export { spaceProps } from './Space'
export type { SpaceProps, SpaceItemClass, SpaceItemStyle } from './Space'