import { withInstall } from '../utils'
import _Checkbox from './Checkbox'

export const Checkbox = withInstall<typeof _Checkbox>(_Checkbox)

export default Checkbox
export { checkboxProps } from './Checkbox'
export type { CheckboxProps } from './Checkbox'
