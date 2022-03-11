import { withInstall } from '../utils'
import _Switch from './Switch'

export const Switch = withInstall<typeof _Switch>(_Switch)

export default Switch
export * from './Switch'
