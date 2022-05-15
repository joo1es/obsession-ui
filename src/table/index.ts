import { withInstall } from '../utils'
import _Table from './Table'

export const Table = withInstall<typeof _Table>(_Table)

export default Table
export * from './Table'
export { DataColumn } from './typings'
