import { withInstall } from '../utils';
import _GridItem from './GridItem';

const GridItem = withInstall<typeof _GridItem>(_GridItem, ['OGi']);

export default GridItem;
export { gridItemProps } from './GridItem';
export type { GridItemProps } from './GridItem';
