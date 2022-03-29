import { withInstall } from '../utils'
import _Result from './Result'

export const Result = withInstall<typeof _Result>(_Result)

export default Result
export * from './Result'