import React from 'react';
import Theme1 from './theme1';
import Theme1Bg from './theme1/theme1WithBg';
import Theme2 from './theme2';

const Theme = ({theme, id, data, iurl, ...props}) => {
    if(theme == "Light" || theme == "White") {
        if(data.BackgroundImage) {
            return (<Theme1Bg data={data} id={id}/>)
        } else {
            return(<Theme1 data={data} id={id}/>)
        } 
    } 
    else if (theme == "Dark") {
        return(<Theme2 data={data} id={id} />)
    }
    // switch (theme) {
    //     case "Light": case "White":
    //         if(data.BackgroundImage.length > 1) {
    //             return(<Theme1Bg data={data} id={id}/>)
    //         } 
    //         else {
                
    //         }

    //         case "Dark":
    //         return(<Theme2 data={data} id={id}/>)
    //     default:
    //         return(<Theme1 data={data} id={id}/>)
    // }
}
export default Theme;