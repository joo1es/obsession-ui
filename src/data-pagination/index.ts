import { withInstall } from '../utils'
import _DataPagination from './DataPagination'

export const DataPagination = withInstall<typeof _DataPagination>(_DataPagination)

export default DataPagination
export { dataPaginationProps } from './DataPagination'
export type { DataPaginationProps } from './DataPagination'