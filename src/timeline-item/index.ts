import { withInstall } from '../utils'
import _TimelineItem from './TimelineItem'

export const TimelineItem = withInstall<typeof _TimelineItem>(_TimelineItem)

export default TimelineItem
export * from './TimelineItem'
