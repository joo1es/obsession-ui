import { withInstall } from '../utils'
import _XScroll from './XScroll'

export const XScroll = withInstall<typeof _XScroll>(_XScroll)

export default XScroll
export { xScrollProps } from './XScroll'
export type { XScrollProps, XScrollInst } from './XScroll'
