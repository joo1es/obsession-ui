import { withInstall } from '../utils'
import _Grid from './Grid'

export const Grid = withInstall<typeof _Grid>(_Grid, ['OG'])

export default Grid
export { gridProps } from './Grid'
export type { GridProps } from './Grid'
