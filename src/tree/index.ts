import { withInstall } from '../utils'
import _Tree from './Tree'

export const Tree = withInstall<typeof _Tree>(_Tree)

export default Tree
export { treeProps } from './Tree'
export type { TreeProps } from './Tree'
export * from './interface'
