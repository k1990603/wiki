import { Dimensions, Platform, PixelRatio } from 'react-native'

const deviceWidthDp = Dimensions.get('window').width;
const uiWidthPx = 750;

export const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp);
export const px2dp = px => PixelRatio.roundToNearestPixel(px);

export const screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePx: 1 / PixelRatio.get(),
  STATUSBAR_HEIGHT: (Platform.OS === 'ios' ? 20 : 0),
  APPBAR_HEIGHT: (Platform.OS === 'ios' ? 44 : 56),
}