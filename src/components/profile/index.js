import React from 'react';
import Theme1 from './theme1';
import Theme2 from './theme2';

const Theme = ({theme, id, data, iurl, ...props}) => {
    switch (theme) {
        case "Light":
            return(<Theme1 data={data} id={id}/>)
        case "Dark":
            return(<Theme2 data={data} id={id}/>)
        default:
            return(<Theme1 data={data} id={id}/>)
    }
}
export default Theme;