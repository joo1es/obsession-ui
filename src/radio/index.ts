import { withInstall } from '../utils'
import _Radio from './Radio'

export const Radio = withInstall<typeof _Radio>(_Radio)

export default Radio
export { radioProps } from './Radio'
export type { RadioProps } from './Radio'