import React from 'react';
import Theme1 from './theme1';
import Theme1Bg from './theme1/theme1WithBg';
import Theme2 from './theme2';
import Theme2Bg from './theme2';

const BusinessTheme = ({theme, id, data, iurl, ...props}) => {
    if(theme == "Light" || theme == "White") {
        return(<Theme1 data={data} id={id}/>)
    } 
    else if (theme == "Dark") {
        return(<Theme2 data={data} id={id}/>)
    }
}
export default BusinessTheme;