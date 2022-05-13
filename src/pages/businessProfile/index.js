import React, { useEffect, useState } from 'react';
import BusinessTheme from '../../components/businessProfile';
import {useParams} from "react-router-dom";
import axios from 'axios';
import c from './profile.module.scss';
import classNames from 'classnames';
import {parseToJson, GetSortOrder} from '../../helper/theme';
import Loading from '../../components/loading';

const BusinessProfile = () => {
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
            const Links = JSON.parse(Response?.data?.BusinessMode.Links);
            Links.sort(GetSortOrder("Order"));
            Response.data.SocialLinks = Links;
            console.log(Response.data.BusinessMode)
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
            <BusinessTheme id={id} data={data} theme={theme} />
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
export default BusinessProfile;