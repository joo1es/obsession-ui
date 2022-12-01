import { withInstall } from '../utils'
import _RotateAlbum from './RotateAlbum'

export const RotateAlbum = withInstall<typeof _RotateAlbum>(_RotateAlbum)

export default RotateAlbum
export * from './RotateAlbum'