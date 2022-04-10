import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

export const COLORS = {
    primary: '#FF5C8D',
    dark : '#141E27',
    white : '#FFFFFF',
    background : '#789395',
    gray : '#EEEEEE',
    blue : '#90E0EF',
    pink : '#FFDDEE'
};

export const SIZES = {
    base: 12,
    font: 16,
    width,
    height,
};