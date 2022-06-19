import { withInstall } from '../utils'
import _Masonry from './Masonry'

export const Masonry = withInstall<typeof _Masonry>(_Masonry)

export default Masonry
export * from './Masonry'
