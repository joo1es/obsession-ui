import { withInstall } from '../utils'
import _InputNumber from './InputNumber'

export const InputNumber = withInstall<typeof _InputNumber>(_InputNumber)

export default InputNumber
export * from './InputNumber'