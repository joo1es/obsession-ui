import { withInstall } from '../utils'
import _Icon from './Icon'

export const Icon = withInstall<typeof _Icon>(_Icon)

export default Icon
export { iconProps } from './Icon'
export type { IconProps } from './Icon'
