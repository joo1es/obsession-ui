import { withInstall } from '../utils'
import _Tab from './tab'

export const Tab = withInstall<typeof _Tab>(_Tab)

export default Tab
export * from './tab'
