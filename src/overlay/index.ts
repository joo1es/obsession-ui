import { withInstall } from '../utils'
import _Overlay from './Overlay'

export const Overlay = withInstall<typeof _Overlay>(_Overlay)

export default Overlay
export { overlayProps } from './Overlay'
export type { OverlayProps } from './Overlay'