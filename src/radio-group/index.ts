import { withInstall } from '../utils'
import _RadioGroup from './RadioGroup'

export const RadioGroup = withInstall<typeof _RadioGroup>(_RadioGroup)

export default RadioGroup
export { radioGroupProps } from './RadioGroup'
export type { RadioGroupProps } from './RadioGroup'