import { withInstall } from '../utils'
import _LayoutAside from './LayoutAside'

export const LayoutAside = withInstall<typeof _LayoutAside>(_LayoutAside)

export default LayoutAside
export { layoutAsideProps } from './LayoutAside'
export type { LayoutAsideProps } from './LayoutAside'
