import { withInstall } from '../utils'
import _PopDialog from './PopDialog'

export const PopDialog = withInstall<typeof _PopDialog>(_PopDialog)

export default PopDialog
export { popDialogProps } from './PopDialog'
export type { PopDialogProps } from './PopDialog'
