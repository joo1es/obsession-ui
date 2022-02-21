import { withInstall } from '../utils'
import _List from './List'

export const List = withInstall<typeof _List>(_List)

export default List
export * from './List'
