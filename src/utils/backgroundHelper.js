import * as Color from '../json/color.json';
const backgroundColourHelper = (bgColor) => {
    const bg = Object.values(Color).filter((color) => color.name == bgColor)
    const bg_Color = bg[0] ? bg[0]['color'] : '#81D4fA';
    return bg_Color
}


export default backgroundColourHelper;