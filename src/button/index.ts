import { withInstall } from '../utils'
import _Button from './Button'

export const Button = withInstall<typeof _Button>(_Button)

export default Button
export { buttonProps } from './Button'
export type { ButtonProps } from './Button'
