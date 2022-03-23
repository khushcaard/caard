import React, { useEffect, useState } from 'react';
import Theme from '../../components/profile';
import {useParams} from "react-router-dom";
import axios from 'axios';
import c from './profile.module.scss';
import classNames from 'classnames';
import {parseToJson, GetSortOrder} from '../../helper/theme';
import Loading from '../../components/loading';

const Profile = () => {
    const { id } = useParams();
    const [theme, setTheme] = useState("1");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    
    useEffect(()=>{
        getProfileData();
    }, [])

    const getProfileData = () =>{
        axios.get(`https://orehcihaoc.execute-api.ap-south-1.amazonaws.com/v1/${id}`)
        .then((res)=>{
            const Response = res;
            const Links = parseToJson(Response?.data);
            Links.sort(GetSortOrder("Order"));
            Response.data.SocialLinks = Links;
            setData(Response.data);
            setTheme(Response?.data?.Theme)
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    if(!loading){
        return(         
            <Theme id={id} data={data} theme={theme} />
        )
    }
    else{
        return(
            <div className={classNames(c.loader)}>
                <div className={classNames("align-center")}>
                    <Loading />
                </div>
            </div>
        )
    }
}   
export default Profile;