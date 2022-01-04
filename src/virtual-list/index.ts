import { withInstall } from '../utils'
import { ExtractPropTypes } from 'vue'
import { VirtualList as _VirtualList, VirtualListInst } from 'vueuc'

const VirtualList = withInstall<typeof _VirtualList>(_VirtualList)
VirtualList.name = 'OVirtualList'

export { VirtualList }
export default VirtualList

export const virtualListProps = VirtualList.props
export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>
export type { VirtualListInst }