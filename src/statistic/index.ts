import { withInstall } from '../utils'
import _Statistic from './Statistic'

export const Statistic = withInstall<typeof _Statistic>(_Statistic)

export default Statistic
export { statisticProps } from './Statistic'
export type StatisticInstance = InstanceType<typeof _Statistic> & { update: () => void }
export type {
    StatisticProps
} from './Statistic'
