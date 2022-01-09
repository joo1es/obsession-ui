import { withInstall } from '../utils'
import _Pagination from './Pagination'

export const Pagination = withInstall<typeof _Pagination>(_Pagination)

export default Pagination
export { paginationProps } from './Pagination'
export type { PaginationProps } from './Pagination'