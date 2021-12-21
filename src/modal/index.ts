import { withInstall } from '../utils'
import _Modal from './Modal'

export const Modal = withInstall<typeof _Modal>(_Modal)

export default Modal
export { closeAllModals } from './utils'
export { modalProps } from './Modal'
export type { ModalProps } from './Modal'