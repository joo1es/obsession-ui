import { withInstall } from '../utils'
import _Progress from './Progress'

export const Progress = withInstall<typeof _Progress>(_Progress)

export default Progress
export { progressProps } from './Progress'
export type {
    ProgressProps
} from './Progress'
