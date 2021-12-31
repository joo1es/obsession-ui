import { withInstall } from '../utils'
import _Layout from './Layout'

export const Layout = withInstall<typeof _Layout>(_Layout, ['OGi'])

export default Layout
export { layoutProps } from './Layout'
export type { LayoutProps } from './Layout'
