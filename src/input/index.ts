import { withInstall } from '../utils'
import _Input from './Input'

export const Input = withInstall<typeof _Input>(_Input)

export default Input
export * from './Input'