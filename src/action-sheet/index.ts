import { withInstall } from '../utils'
import _ActionSheet from './ActionSheet'

export const ActionSheet = withInstall<typeof _ActionSheet>(_ActionSheet)

export default ActionSheet
export { actionSheetProps } from './ActionSheet'
export type { ActionSheetProps, ActionSheetRecord } from './ActionSheet'