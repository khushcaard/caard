import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import c from './theme2bg.module.scss';
import {AppIconDark, LocationPinIcon, YoutubeColoredIcon} from '../../shared/svg';
import CardMedia from '@mui/material/CardMedia';
import {videoURL} from '../../../helper/theme'
import {API_URLS} from "../../../config/api_urls/api_urls";
import { Carousel } from 'react-responsive-carousel';

const Theme2Bg = ({id, data, ...props}) => {
    const [play, setPlay] = useState(false); 
    const [url, setUrl] = useState("https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=")
    var bgImgs = ["https://images.unsplash.com/photo-1649401691853-6ecfa00f044e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1444090542259-0af8fa96557e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80","https://images.unsplash.com/photo-1596226833102-76b6247dfc2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"];

    const videoId = (data.FeaturedVideo ? data.FeaturedVideo.split("?v=")[1] : "testtest") //data.FeaturedVideo.split("?v=")[1];
    const thumb = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg"
    useEffect(() => {
        if (data.DirectLink == true) {
            const rurl = "https://" + data.SocialLinks[0].URL;
            window.location.href = rurl//data.SocialLinks[0].URL;
        }
      }, []);

    function getBg() {
        if ("BackgroundImage" in data) {
            return data?.BackgroundImage;
        } else {
            return "none";
        }
      }
      
    if (data.DirectLink == true) { 
        return null
    } else {
        return(
            <div style={{ backgroundImage: `url(${getBg()})` }}  className={classNames(c.theme2)}> 
                <div>
                    <div className={classNames(c.boxImage)}>
                        {data.BusinessMode ? (
                            <Carousel
                                autoPlay={true}
                                interval={5000}
                                infiniteLoop={true}
                                showArrows={false} showStatus={false}
                                showIndicators={false} showThumbs={false}>
                                    {/* {bgImgs.map((element) => (
                                        <img className={classNames(c.profileBgImage)} src={data?.PersonalInfo?.CoverImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.CoverImageLocation}` : element} alt="bg-img"/>
                                    ))}   */}
                                {JSON.parse(data.BusinessMode.HoveringImages).map(element => (
                                    <img className={classNames(c.profileBgImage)} src={data?.PersonalInfo?.CoverImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.CoverImageLocation}` : element.URL} alt="bg-img"/>
                                ))}
                            </Carousel>
                        ) : (
                            data?.PersonalInfo?.CoverImageLocation ?
                            <div className={classNames(c.profileBgImage)} ></div>
                            :
                            <div className={classNames(c.profileBgImage)}></div>
                        )
                        }
                        
                        {/* {
                            data?.PersonalInfo?.CoverImageLocation ?
                            <div className={classNames(c.profileBgImage)} ></div>
                            :
                            <div className={classNames(c.profileBgImage)}></div>
                        } */}
                    </div>
                    <center>
                        <div className={classNames(c.profileImageBorder, "rounded-circle")}>
                            <img className={classNames(c.profileImage, "rounded-circle")} src={data?.PersonalInfo?.ImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.ImageLocation}` : require('../../../assets/images/Profile.png')} alt="profile"/>
                        </div>

                        <div className={classNames(c.profileName, "text-center")}>{data?.PersonalInfo.Name || "Update your name"}</div>
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
                        <div className={classNames(c.sBox)}>
                        {(data?.SocialLinks && Array.isArray(data.SocialLinks) && ((data.SocialLinks).length > 0) ) &&
                                data?.SocialLinks.slice(0,3).map((item) => {
                                    if(item.isActive == true) {
                                        return(
                                            <div className={classNames(c.sBoxChild)}>
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
                                    }
                                    else {
                                        return null
                                    }
                                })}
                        </div>
                    </div>
                        {
                            data.FeaturedVideo ? (
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
                                            <div className={classNames(c.text)}>{data?.PersonalInfo.Name || "Video Title"}</div>
                                            <div className={classNames(c.playerIcon)}>
                                                <YoutubeColoredIcon/>
                                            </div>                    
                                        </div>
                                    </div>
                            }
                            </div>
                            ) : (null)
                        }

                        {
                            (data?.SocialLinks && Array.isArray(data.SocialLinks) && ((data.SocialLinks).length > 3) ) &&
                            <div className="row justify-content-center mt-3">
                                {   
                                    data.SocialLinks.filter(element => element.Name === 'Email' || element.Name === 'Call' || element.Name === 'Gmail' | element.Name === 'Facebook').map((item)=>{
                                        if (item.isActive === true) {
                                            return (
                                                <div key={item?.Name} className={classNames(c.cursorPointer,"col-auto mt-4")}>
                                                    <a href={`${item?.URL}`} target="_blank" rel="noopener noreferrer" className={c.anchor}>  
                                                        <div className={classNames(c.circleIcon)}>
                                                            <div className={classNames(c.centerIcon)}>
                                                                <img className={classNames(c.socialImage)} src={`${API_URLS.blackAssets}${item?.Name}.svg`} alt={item?.Name}/>
                                                            </div>
                                                        </div>
                                                        <div className={classNames(c.circleIconText, "text-white mt-2 text-center")}>{item?.Name}</div>
                                                    </a>    
                                                </div>
                                            )
                                        } 
                                        else {
                                            return (null)
                                        }
                                    })
                                }
                                {   
                                    data.SocialLinks.filter(element => element.Name !== 'Email' && element.Name !== 'Call' && element.Name !== 'Gmail' && element.Name !== 'Facebook').slice(3).map((item)=>{
                                        if (item.isActive === true) {
                                            return (
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
                                        } 
                                        else {
                                            return (null)
                                        }
                                    })
                                }
                            </div>
                        }
                        <div className={classNames(c.bottomApp)}>
                            <a href='https://caard.club' target='_blank'>
                                <AppIconDark/>
                            </a>
                            <center>
                                <div target='_blank' href='https://caard.club' style={{ textDecoration:'none'}} className={classNames(c.text)}>Powered by Caard</div>
                            </center>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Theme2Bg;