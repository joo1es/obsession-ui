import { withInstall } from '../utils'
import _Breadcrumb from './Breadcrumb'

export const Breadcrumb = withInstall<typeof _Breadcrumb>(_Breadcrumb)

export default Breadcrumb
export { breadcrumbProps } from './Breadcrumb'
export type { BreadcrumbProps, BreadcrumbRecord } from './Breadcrumb'