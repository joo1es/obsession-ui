import { withInstall } from '../utils'
import _Image from './Image'

export const Image = withInstall<typeof _Image>(_Image)

export default Image
export { imageProps } from './Image'
export type { ImageProps } from './Image'