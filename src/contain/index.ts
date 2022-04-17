import { withInstall } from '../utils'
import _Contain from './Contain'

export const Contain = withInstall<typeof _Contain>(_Contain)

export default Contain
export * from './Contain'