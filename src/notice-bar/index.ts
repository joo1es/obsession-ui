import { withInstall } from '../utils'
import _NoticeBar from './NoticeBar'

export const NoticeBar = withInstall<typeof _NoticeBar>(_NoticeBar)

export default NoticeBar
export * from './NoticeBar'