import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import c from './theme1.module.scss';
import {AppIcon, YoutubeIcon} from '../../shared/svg';
import CardMedia from '@mui/material/CardMedia';
import {videoURL} from '../../../helper/theme';
import {API_URLS} from "../../../config/api_urls/api_urls";

const Theme1 = ({id, data, ...props}) => {
   
    const [play, setPlay] = useState(false)
    const [url, setUrl] = useState("https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=")
    useEffect(() => {
        fetch("https://api.unsplash.com/photos/random/?client_id=ggH1r9hjKwGNiw2nhHuZJ9eQoQU72Qgydty47Y06vZs")
            .then(res => res.json())
            .then((result) => setUrl(result.urls.small))
    }, [])
    
    return(
    <div style={{ backgroundImage: `url(${url})`}} className={classNames(c.theme1)}>
            
        <div className={classNames(c.filter)}>
            <div className={classNames(c.profileBgContainer)} />
            <center><img className={classNames(c.profileImage, "rounded-circle")} src={data?.PersonalInfo?.ImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.ImageLocation}` : require('../../../assets/images/Profile.png')} alt="profile"/></center>
            <div className={classNames(c.profileName, "text-center")}>{data?.FullName || "Update your name"}</div>
            <div className={classNames(c.cityText, "text-center")}>{data?.PersonalInfo?.Location || "Update your location"}</div>
            <div className={classNames(c.cityText, "text-center")}>{data?.PersonalInfo?.Work || "Update your work"}</div>

            <div className={classNames(c.boxContainer)}>
                <div className={classNames(c.boxTextContainer)}>
                    <div className={classNames(c.text)}>
                        {data?.PersonalInfo?.Bio || "Update your BIO"}
                    </div>
                </div>

                {
                    (data?.SocialLinks && Array.isArray(data.SocialLinks) && (data.SocialLinks).length > 0 ) &&
                     <div className={c.boxSocialContainer}>
                        {
                            (data.SocialLinks).map((item)=>{
                                return(
                                    
                                        <center key={item?.Order}>
                                            <a href={`https://${item?.URL}`} target="_blank" rel="noopener noreferrer" className={c.anchor}>
                                                <img className={classNames(c.socialImage)} src={`${API_URLS.whiteAssets}${item?.Name}.svg`} alt={item?.Name}/>
                                            </a>
                                        </center>
                                )
                            })
                        }
                    </div>
                }

                {
                    data?.FeaturedVideo &&
                    <div className="my-5">
                        {
                            play ?
                            <CardMedia component="iframe" allow="autoplay" allowFullScreen="allowfullscreen" className={classNames(c.videoPlayer)} 
                                src={`${videoURL(data?.FeaturedVideo)}?autoplay=1&mute=1`}/>
                            :
                            <div className={classNames(c.video)} style={{backgroundImage: 'url(' + require("../../../assets/images/video.png")+')'}}>
                                {
                                    data?.PersonalInfo?.ImageLocation ? 
                                    <div className={classNames(c.icon)} style={{backgroundImage: 'url('+ `data:image/png;base64,${data?.PersonalInfo?.ImageLocation}`+')'}}></div>
                                    :
                                    <div className={classNames(c.icon)} style={{backgroundImage: 'url('+ require("../../../assets/images/Profile.png") +')'}}></div>
                                }
                                <div className={classNames(c.text)}>{data?.FullName || "Video Title"}</div>
                                <div className={classNames(c.playerIcon)} onClick={()=>setPlay(true)}>
                                    <YoutubeIcon/>
                                </div>                    
                            </div>
                        }
                    </div>
                }

            <div className={classNames(c.bottomApp)}>
                <center><AppIcon/></center>
                <center><div className={classNames(c.text)}>Developed by Caard©</div></center>
            </div>
            
            </div>
            </div>
        </div>
    )
}
export default Theme1;