import { withInstall } from '../utils'
import _PopConfirm from './PopConfirm'

export const PopConfirm = withInstall<typeof _PopConfirm>(_PopConfirm)

export default PopConfirm
export { popConfirmProps } from './PopConfirm'
export type {
    PopConfirmProps
} from './PopConfirm'
