import { withInstall } from '../utils'
import _ScrollList from './ScrollList'

export const ScrollList = withInstall<typeof _ScrollList>(_ScrollList)

export default ScrollList
export { scrollListProps } from './ScrollList'
export type {
    ScrollListProps
} from './ScrollList'
