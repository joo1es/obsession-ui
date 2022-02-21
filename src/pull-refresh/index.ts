import { withInstall } from '../utils'
import _PullRefresh from './PullRefresh'

export const PullRefresh = withInstall<typeof _PullRefresh>(_PullRefresh)

export default PullRefresh
export * from './PullRefresh'
