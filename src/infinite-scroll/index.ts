import { withInstall } from '../utils'
import _InfiniteScroll from './InfiniteScroll'

export const InfiniteScroll = withInstall<typeof _InfiniteScroll>(_InfiniteScroll)

export default InfiniteScroll
export * from './InfiniteScroll'