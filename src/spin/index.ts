import { withInstall } from '../utils'
import _Spin from './Spin'

export const Spin = withInstall<typeof _Spin>(_Spin)

export default Spin
export * from './Spin'
