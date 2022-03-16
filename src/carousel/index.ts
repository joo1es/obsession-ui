import { withInstall } from '../utils'
import _Carousel from './Carousel'

export const Carousel = withInstall<typeof _Carousel>(_Carousel)

export default Carousel
export * from './Carousel'
