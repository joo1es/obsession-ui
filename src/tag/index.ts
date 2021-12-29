import { withInstall } from '../utils'
import _Tag from './Tag'

export const Tag = withInstall<typeof _Tag>(_Tag)

export default Tag
export { tagProps } from './Tag'
export type { TagProps } from './Tag'