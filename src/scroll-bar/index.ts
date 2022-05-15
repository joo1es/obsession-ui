import { withInstall } from '../utils'
import _ScrollBar from './ScrollBar'

export const ScrollBar = withInstall<typeof _ScrollBar>(_ScrollBar)

export default ScrollBar
export * from './ScrollBar'