import { withInstall } from '../utils'
import _Comment from './Comment'

export const Comment = withInstall<typeof _Comment>(_Comment)

export default Comment
export { commentProps } from './Comment'
export type { CommentProps } from './Comment'