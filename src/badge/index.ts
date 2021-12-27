import { withInstall } from '../utils'
import _Badge from './Badge'

export const Badge = withInstall<typeof _Badge>(_Badge)

export default Badge
export { badgeProps } from './Badge'
export type { BadgeProps } from './Badge'