import { withInstall } from '../utils'
import _Timeline from './Timeline'

export const Timeline = withInstall<typeof _Timeline>(_Timeline)

export default Timeline
export * from './Timeline'
