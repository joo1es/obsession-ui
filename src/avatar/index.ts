import { withInstall } from '../utils'
import _Avatar from './Avatar'

export const Avatar = withInstall<typeof _Avatar>(_Avatar)

export default Avatar
export { avatarProps } from './Avatar'
export type { AvatarProps } from './Avatar'