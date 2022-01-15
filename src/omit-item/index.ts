import { withInstall } from '../utils'
import _OmitItem from './OmitItem'

export const OmitItem = withInstall<typeof _OmitItem>(_OmitItem)

export default OmitItem
export * from './OmitItem'