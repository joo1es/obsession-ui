import { withInstall } from '../utils'
import _LayoutContent from './LayoutContent'

export const LayoutContent = withInstall<typeof _LayoutContent>(_LayoutContent)

export default LayoutContent
export { layoutContentProps } from './LayoutContent'
export type { LayoutContentProps } from './LayoutContent'
