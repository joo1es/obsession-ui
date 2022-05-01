import { withInstall } from '../utils'
import _BackTop from './BackTop'

export const BackTop = withInstall<typeof _BackTop>(_BackTop)

export default BackTop
export * from './BackTop'