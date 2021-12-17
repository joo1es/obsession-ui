import { withInstall } from '../utils'
import _Ellipsis from './Ellipsis'

export const Ellipsis = withInstall<typeof _Ellipsis>(
    _Ellipsis
)

export default Ellipsis
export { ellipsisProps } from './Ellipsis'
export type { EllipsisProps } from './Ellipsis'
