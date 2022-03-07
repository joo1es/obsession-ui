import { withInstall } from '../utils'
import _Cascader from './Cascader'

export const Cascader = withInstall<typeof _Cascader>(_Cascader)

export default Cascader

export * from './Cascader'