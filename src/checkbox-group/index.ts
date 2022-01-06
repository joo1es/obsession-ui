import { withInstall } from '../utils'
import _CheckboxGroup from './CheckboxGroup'

export const CheckboxGroup = withInstall<typeof _CheckboxGroup>(_CheckboxGroup)

export default CheckboxGroup
export { checkboxGroupProps } from './CheckboxGroup'
export type { CheckboxGroupProps } from './CheckboxGroup'
