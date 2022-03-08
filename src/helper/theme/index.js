export function videoURL(URL){
    let link = URL;

    if(link.search("youtube") !== -1 )
	    return(link.replace('/watch?v=', '/embed/'));
	
    else if(link.search("vimeo") !== -1)
        return(link.replace('vimeo.com', 'player.vimeo.com/video'));
    else 
        return("");
}

export const GetSortOrder = (prop) => {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 

export const parseToJson = (data) => {
    if(data?.Links && Array.isArray(JSON.parse(data?.Links)) && (JSON.parse(data?.Links)).length > 0 )
        return (JSON.parse(data.Links));
    else
        return [];
}