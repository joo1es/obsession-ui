import { withInstall } from '../utils'
import _ImagePreview from './ImagePreview'

export const ImagePreview = withInstall<typeof _ImagePreview>(_ImagePreview)

export default ImagePreview
export * from './ImagePreview'
export * from './interface'