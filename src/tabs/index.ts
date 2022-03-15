import { withInstall } from '../utils'
import _Tabs from './tabs'

export const Tabs = withInstall<typeof _Tabs>(_Tabs)

export default Tabs
export * from './tabs'
