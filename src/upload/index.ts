import { withInstall } from '../utils'
import _Upload from './Upload'

export const Upload = withInstall<typeof _Upload>(_Upload)

export default Upload
export * from './Upload'
export * from './interface'