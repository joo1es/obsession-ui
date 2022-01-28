import { withInstall } from '../utils'
import _CountTo from './CountTo'

export const CountTo = withInstall<typeof _CountTo>(_CountTo)

export default CountTo
export { countToProps } from './CountTo'
export type { CountToProps } from './CountTo'
