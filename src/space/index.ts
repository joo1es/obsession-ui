import { withInstall } from '../utils';
import _Space from './Space';

const Space = withInstall<typeof _Space>(_Space);

export default Space;
export { spaceProps } from './Space';
export type { SpaceProps, SpaceItemClass, SpaceItemStyle } from './Space';
