import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import c from './theme2.module.scss';
import {AppIconDark, LocationPinIcon, YoutubeColoredIcon} from '../../shared/svg';
import CardMedia from '@mui/material/CardMedia';
import {videoURL} from '../../../helper/theme'
import {API_URLS} from "../../../config/api_urls/api_urls";

const Theme2 = ({id, data, ...props}) => {
    const [play, setPlay] = useState(false)
    const [url, setUrl] = useState("https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=")

    const videoId = data.FeaturedVideo.split("?v=")[1];
    const thumb = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg"
    
    return(
        <div 
        /*style={{backgroundImage: 'url(' + require("../../../assets/images/player.png")+')'}}*/ className={classNames(c.theme2)}>
            <div className={classNames(c.filter)}>
                <div className={classNames(c.boxImage)}>
                    {
                        data?.PersonalInfo?.CoverImageLocation ?
                        <div className={classNames(c.profileBgImage)}></div>
                        :
                        <div className={classNames(c.profileBgImage)}></div>
                    }
                </div>
                <center>
                    <div className={classNames(c.profileImageBorder, "rounded-circle")}>
                        <img className={classNames(c.profileImage, "rounded-circle")} src={data?.PersonalInfo?.ImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.ImageLocation}` : require('../../../assets/images/Profile.png')} alt="profile"/>
                    </div>

                    <div className={classNames(c.profileName, "text-center")}>{data?.FullName || "Update your name"}</div>
                    <div className={classNames(c.cityText, "text-center")}>{data?.PersonalInfo?.Work || "Update your work"}</div>
                    <div className={classNames(c.cityText, "text-center")}><LocationPinIcon/>{data?.PersonalInfo?.Location || "Update your location"}</div>
                </center>

                <div className={classNames(c.boxContainer)}>
                    <div className={classNames(c.boxTextContainer)}>
                        <div className={classNames(c.text)}>
                            {data?.PersonalInfo?.Bio || "Update your BIO"}
                        </div>
                    </div>

                    <div className={classNames("my-5")}>
                        <div className="row justify-content-center">
                        {
                            (data?.SocialLinks && data.isActive == true && Array.isArray(data.SocialLinks) && ((data.SocialLinks).length > 0) ) &&
                                data?.SocialLinks.slice(0,3).map((item) => {
                                    if (item.isActive == true) {
                                        return(
                                            <div className="col-auto">
                                                <a href={`https://${item?.URL}`} target="_blank" rel="noopener noreferrer" className={c.anchor}>  
                                                    <div className={classNames(c.socialIcons)}>
                                                        <div className={classNames(c.socialIconsOuter)}> 
                                                            <div className={classNames(c.socialIcon)}>
                                                                <img className={classNames(c.socialImage)} src={`${API_URLS.blackAssets}${item?.Name}.svg`} alt={item?.Name}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    } else {
                                        return (<div />)
                                    }
                                })
                        }
                        </div>
                    </div>
                    {
                        data?.FeaturedVideo &&
                        <div>
                        {
                            play ?
                                <CardMedia component="iframe" allow="autoplay" allowFullScreen="allowfullscreen" className={classNames(c.videoPlayer)} 
                                    src={`${videoURL(data?.FeaturedVideo)}?autoplay=1&mute=1`}
                                />
                            :
                                <div className={classNames(c.videoOuter)} onClick={()=>setPlay(true)}>
                                    <div className={classNames(c.video)} style={{backgroundImage: `url(${thumb})`}}>
                                        {
                                            data?.PersonalInfo?.ImageLocation ? 
                                            <div className={classNames(c.icon,"bg-white")} style={{backgroundImage: 'url('+ `data:image/png;base64,${data?.PersonalInfo?.ImageLocation}`+')'}}></div>
                                            :
                                            <div className={classNames(c.icon,"bg-white" )} style={{backgroundImage: 'url('+ require("../../../assets/images/Profile.png") +')'}}></div>
                                        }
                                        <div className={classNames(c.text)}>{data?.FullName || "Video Title"}</div>
                                        <div className={classNames(c.playerIcon)}>
                                            <YoutubeColoredIcon/>
                                        </div>                    
                                    </div>
                                </div>
                        }
                        </div>
                    }

                    {
                        (data?.SocialLinks && Array.isArray(data.SocialLinks) && ((data.SocialLinks).length > 3) ) &&
                        <div className="row justify-content-center mt-3">
                            {
                                data.SocialLinks.slice(3).map((item)=>{
                                    return(
                                        <div key={item?.Name} className={classNames(c.cursorPointer,"col-auto mt-4")}>
                                            <a href={`https://${item?.URL}`} target="_blank" rel="noopener noreferrer" className={c.anchor}>  
                                                <div className={classNames(c.circleIcon)}>
                                                    <div className={classNames(c.centerIcon)}>
                                                        <img className={classNames(c.socialImage)} src={`${API_URLS.blackAssets}${item?.Name}.svg`} alt={item?.Name}/>
                                                    </div>
                                                </div>
                                                <div className={classNames(c.circleIconText, "text-white mt-2 text-center")}>{item?.Name}</div>
                                            </a>    
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <div className={classNames(c.bottomApp)}>
                        <center><AppIconDark/></center>
                        <center><div className={classNames(c.text)}>Developed by Caard©</div></center>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Theme2;