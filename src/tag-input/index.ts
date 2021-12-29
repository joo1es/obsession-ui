import { withInstall } from '../utils'
import _TagInput from './TagInput'

export const TagInput = withInstall<typeof _TagInput>(_TagInput)

export default TagInput
export { tagInputProps } from './TagInput'
export type { TagInputProps } from './TagInput'