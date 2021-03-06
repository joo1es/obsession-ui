import { withInstall } from '../utils'
import _CollapseTransition from './CollapseTransition'

export const CollapseTransition = withInstall<typeof _CollapseTransition>(
    _CollapseTransition
)

export default CollapseTransition
export { collapseTransitionProps } from './CollapseTransition'
export type { CollapseTransitionProps } from './CollapseTransition'
