import { withInstall } from '../utils'
import _Menu from './Menu'

export const Menu = withInstall<typeof _Menu>(_Menu)

export default Menu
export type { MenuList, MenuRecord } from './typings'
export { menuProps } from './Menu'
export type { MenuProps } from './Menu'