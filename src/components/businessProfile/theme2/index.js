import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import c from './theme2.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import {AppIconDark, AppIcon, LocationPinIcon, YoutubeColoredIcon, AboutArrowIcon } from '../../shared/svg';
import CardMedia from '@mui/material/CardMedia';
import {videoURL} from '../../../helper/theme'
import {API_URLS} from "../../../config/api_urls/api_urls";
import GoogleMapReact from 'google-map-react';
import Zoom from 'react-medium-image-zoom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import 'react-medium-image-zoom/dist/styles.css'
import { Carousel } from 'react-responsive-carousel';

const Theme2 = ({id, data, ...props}) => {
    const [play, setPlay] = useState(false); 
    const navigate = useNavigate();
    const [url, setUrl] = useState("https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=")

    const videoId = (data.BusinessMode.FeaturedVideo ? data.BusinessMode.FeaturedVideo.split("?v=")[1] : "testtest") //data.FeaturedVideo.split("?v=")[1];
    const thumb = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg"
    const renderArrow = direction => (onClickHandler, shouldBeEnabled, label) => {
        if (!shouldBeEnabled) {
          return;
        }
      
        const styles = {
          position: "absolute",
          top: "45%",
          zIndex: 2,
          border: 'none',
          backgroundColor: 'transparent'
        };
      
        if (direction === "prev") {
          styles.left = 10;
        } else {
          styles.right = 10;
        }
      
        return (
          <button type="button" onClick={onClickHandler} style={styles}>
            {direction === "prev" ? (
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3812 -2.44301L2.53299 12.0003L15.3812 26.4436L15.3812 -2.44301Z" stroke="white" stroke-width="3"/>
                </svg>        
            ) : (
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1.84211 -2.44301L11.0061 12.0003L-1.84211 26.4436L-1.84211 -2.44301Z" stroke="white" stroke-width="3"/>
                </svg>
            )}
          </button>
        );
      };

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
            <div className={classNames(c.theme2)}
            /*style={{backgroundImage: 'url(' + require("../../../assets/images/player.png")+')'}}*/>
                <div className={classNames(c.modal)}>
                    <div className={classNames(c.boxImage)}>
                            <Carousel
                                renderArrowPrev={renderArrow("prev")}
                                renderArrowNext={renderArrow("next")}                            
                                renderIndicator={(
                                    onClickHandler, isSelected,index, label
                                  ) => {
                                      if(isSelected) {
                                          return (
                                            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'baseline', left: 16, top: -135 }} >
                                                <svg style={{ marginRight: 8}} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="4" cy="4" r="4" fill="white" fillOpacity={index-0.5}/>
                                                </svg>
                                                <svg style={{ marginRight: 8}} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="4" cy="4" r="4" fill="white" fill-opacity={index-0.5}  />
                                                </svg>
                                                <svg style={{ marginRight: 8}} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="4" cy="4" r="4" fill="white" fill-opacity={index-0.5}  />
                                                </svg>
                                                <svg style={{ marginRight: 8}} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="4" cy="4" r="4" fill="white" fill-opacity={index-0.5}  />
                                                </svg>
                                                <p style={{ color:"#fff" }}>{index + 1}/4</p>
                                            </div>
                                          )
                                      }
                                  }}
                                autoPlay={true}
                                interval={10000}
                                infiniteLoop={true}
                                showArrows={true} showStatus={false}
                                showIndicators={true} showThumbs={false}>
                                {JSON.parse(data.BusinessMode.PersonalInfo.CoverImage).map(element => (
                                    <img className={classNames(c.profileBgImage)} src={data?.PersonalInfo?.CoverImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.CoverImageLocation}` : element.URL} alt="bg-img"/>
                                ))}
                        </Carousel>  
                    </div>
                    <center>
                        <div className={classNames(c.profileImageBorder, "rounded-circle")}>
                            <img className={classNames(c.profileImage, "rounded-circle")} src={data?.PersonalInfo?.ImageLocation ? `data:image/png;base64,${data?.PersonalInfo?.ImageLocation}` : require('../../../assets/images/Profile.png')} alt="profile"/>
                        </div>

                        <div className={classNames(c.profileName, "text-center")}>{data?.PersonalInfo.Name || "Update your name"}</div>
                        <div className={classNames(c.citylayout)}>
                            <div className={classNames(c.cityText, "text-center")}>{data?.PersonalInfo?.Work || "Update your work"}</div>
                            <div className={classNames(c.cityText)}>&emsp;|&emsp;</div>
                            <div className={classNames(c.cityText, "text-center")}><LocationPinIcon/>{data?.PersonalInfo?.Location || "Update your location"}</div>
                        </div>
                    </center>

                    <div className={classNames(c.boxContainer)}>
                        <div className={classNames(c.boxTextContainer)}>
                            <div className={classNames(c.title)}>
                                <p style={{ marginTop:12, marginRight:10 }}>About</p>
                                <AboutArrowIcon />
                            </div>
                            <div className={classNames(c.text)}>
                                {data?.BusinessMode.PersonalInfo?.Bio || "Update your BIO"}
                            </div>
                        </div>

                        <div className={classNames(c.doclayout)}>
                            <div className={classNames(c.docText)}>{"Company Documents"}</div>
                            <div className={classNames(c.cityText)}>&emsp;|&emsp;</div>
                            <div className={classNames(c.dwText)}>{"download List Below"}</div>
                        </div>

                        <div className={classNames(c.brochureContainer)}>
                            <svg width="19" height="34" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.8289 -5.10404L2.16581 17.0003L21.8289 39.1046L21.8289 -5.10404Z" stroke="black" stroke-width="3"/>
                            </svg>
                            <div className={classNames(c.brochure)}>
                                <svg width="45" height="49" viewBox="0 0 45 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.944395 14.5218L15.3161 0.157227H41.6391C42.9607 0.157227 44.038 1.24654 44.038 2.53216V45.6641C44.0374 46.2942 43.7866 46.8982 43.3408 47.3435C42.8951 47.7889 42.2908 48.039 41.6607 48.039H3.32173C3.00733 48.0368 2.69644 47.9727 2.40681 47.8504C2.11719 47.728 1.8545 47.5498 1.63374 47.326C1.41298 47.1021 1.23848 46.8369 1.12021 46.5456C1.00193 46.2543 0.942187 45.9426 0.944395 45.6282V14.5218ZM17.703 3.74836L4.53553 16.9158H17.703V3.74836Z" fill="#222222"/>
                                </svg>
                                <p className={classNames(c.btext)}>Brochure.pdf</p>
                            </div>
                            <svg width="19" height="34" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-3.23514 -5.10404L16.4279 17.0003L-3.23514 39.1046L-3.23514 -5.10404Z" stroke="black" stroke-width="3"/>
                            </svg>
                        </div>

                        <div className={classNames(c.doclayout)}>
                            <div className={classNames(c.docText)}>{" Company Images"}</div>
                            <div className={classNames(c.cityText)}>&emsp;|&emsp;</div>
                            <div className={classNames(c.dwText)}>{"Tap or slide to view more"}</div>
                        </div>

                        <div className={classNames(c.companyImages)}>
                            <div className={classNames(c.companyContainer)}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginRight:24 }}>
                                    <Zoom>
                                        <img className={classNames(c.image)} src='https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVpbGRpbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500' />
                                    </Zoom>
                                    <div className={classNames(c.description)}>Godrej Emerald Mumbai</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Zoom>
                                        <img className={classNames(c.image)} src='https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVpbGRpbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500' />
                                    </Zoom>
                                    <div className={classNames(c.description)}>Godrej Emerald Mumbai</div>
                                </div>
                            </div>
                        </div>

                        {
                            data.BusinessMode.FeaturedVideo ? (
                            <div>
                            {
                                play ?
                                    <CardMedia component="iframe" allow="autoplay" allowFullScreen="allowfullscreen" className={classNames(c.videoPlayer)} 
                                        src={`${videoURL(data?.BusinessMode.FeaturedVideo)}?autoplay=1&mute=1`}
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

                        <div className={classNames(c.doclayout)}>
                            <div className={classNames(c.docText)}>{"social/other link"}</div>
                            <div className={classNames(c.cityText)}>&emsp;|&emsp;</div>
                            <div className={classNames(c.dwText)}>{"Tap to view "}</div>
                        </div>

                        <div className={classNames("my-0")}>
                        {
                            (data?.SocialLinks && Array.isArray(data.SocialLinks) && (data.SocialLinks).length > 0 ) &&
                            <div className={c.boxSocialContainer}>
                                {
                                    (data.SocialLinks).filter(element => element.Name === 'Email' || element.Name === 'Call').map((item)=>{
                                        if (item.isActive === true) { 
                                            return (
                                                <center className={classNames("mt-1")} key={item?.Order}>
                                                    <a href={`${item?.URL}`} target="_blank" rel="noopener noreferrer" className={c.anchor}>
                                                        <img className={classNames(c.socialImage)} src={`${API_URLS.whiteAssets}${item?.Name}.svg`} alt={item?.Name}/>
                                                    </a>
                                                </center>) }
                                        else {
                                            return(
                                                null    
                                            )}
                                    })
                                }
                                {
                                    (data.SocialLinks).filter(element => element.Name !== 'Email' || element.Name !== 'Call').map((item)=>{
                                        if (item.isActive === true) { 
                                            return (
                                                <center className={classNames("mt-1")} key={item?.Order}>
                                                    <a href={`https://${item?.URL}`} target="_blank" rel="noopener noreferrer" className={c.anchor}>
                                                        <img className={classNames(c.socialImage)} src={`${API_URLS.whiteAssets}${item?.Name}.svg`} alt={item?.Name}/>
                                                    </a>
                                                </center>) }
                                        else {
                                            return(
                                                null    
                                            )}
                                    })
                                }
                            </div>
                        }
                        </div>
                        

                        {
                            (data?.SocialLinks && Array.isArray(data.SocialLinks) && ((data.SocialLinks).length > 3) ) &&
                            <div className="row justify-content-center mt-3">
                                {
                                    data.SocialLinks.slice(3).map((item)=>{
                                        if (item.isActive == true) {
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
                                        } else {
                                            return (<div></div>)
                                        }
                                    })
                                }
                            </div>
                        }

                        <div className={classNames(c.doclayout)}>
                            <div className={classNames(c.docText)}>{"Office Location"}</div>
                            <div className={classNames(c.cityText)}>&emsp;|&emsp;</div>
                            <div className={classNames(c.dwText)}>{"Tap to view/navigate on maps"}</div>
                        </div>

                        <div className={classNames(c.map)}>
                            <GoogleMapReact
                                bootstrapURLKeys={{
                                    key: "AIzaSyAlnnM9sOIHkH1Ifu6J6BzKJREXShuEH6s",
                                    language: "en",
                                    region: "US"
                                }}
                                defaultCenter={{ lat: 51.506, lng: -0.169 }}
                                defaultZoom={15}
                                >

                            </GoogleMapReact>
                        </div>
                        
                        <div className={classNames(c.bottomApp)}>
                            <p className={classNames(c.thanks)}>Thank You!</p>
                            <p className={classNames(c.note)}>For using our product to leveling up your Business online.</p>
                            <a href='https://caard.club' target='_blank'>
                                <svg width="19" height="37" viewBox="0 0 19 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2401 36.1912C17.057 36.1912 16.863 36.1445 16.6635 36.0446L4.63527 30.1695C3.12935 29.4335 1.96234 28.4143 1.16975 27.1421C0.39356 25.9031 0 24.471 0 22.8856L0 12.1279C0 10.013 1.6453 8.04467 4.63527 6.58256L16.6662 0.704141C17.1117 0.487655 17.538 0.5143 17.866 0.784075C18.194 1.05385 18.3744 1.52679 18.3744 2.11296V10.8623C18.3744 11.4119 18.2131 12.0047 17.9207 12.5309C17.6282 13.0572 17.2374 13.4602 16.8192 13.6633L7.17701 18.376L16.8165 23.0854C17.2347 23.2886 17.6282 23.6916 17.9179 24.2178C18.2104 24.7441 18.3716 25.3369 18.3716 25.8864V34.6358C18.3716 35.222 18.1912 35.6949 17.8633 35.9647C17.6829 36.1179 17.4697 36.1912 17.2401 36.1912ZM17.2401 1.06051C17.109 1.06051 16.9668 1.09715 16.8192 1.17042L4.78832 7.04551C3.34526 7.75159 2.23018 8.56757 1.47585 9.47681C0.76799 10.3294 0.409959 11.2187 0.409959 12.1279L0.409959 22.8889C0.409959 25.9097 1.96507 28.3311 4.78832 29.7099L16.8192 35.585C17.1363 35.7382 17.426 35.7282 17.6364 35.555C17.8469 35.3818 17.9644 35.0554 17.9644 34.6425V25.8864C17.9644 24.9472 17.3823 23.8981 16.6662 23.5484L6.07559 18.376L16.6662 13.2037C17.3823 12.854 17.9644 11.8049 17.9644 10.8657V2.11296C17.9644 1.69665 17.8469 1.37358 17.6364 1.20039C17.5244 1.10714 17.3877 1.06051 17.2401 1.06051Z" fill="#171717"/>
                                    <path d="M5.06202 6.5943C0.285031 8.86606 -0.0353773 12.0371 0.401542 13.3386C1.12974 15.7523 4.92852 17.746 6.73688 18.4412C9.91669 16.829 16.3928 13.5516 16.8589 13.3386C17.3249 13.1256 17.9269 11.9779 18.1696 11.4307V1.71358C18.1696 1.28762 17.6113 0.944493 17.3322 0.826172C15.2325 1.80232 9.83901 4.32255 5.06202 6.5943Z" fill="#171717"/>
                                </svg>
                            </a>
                            <div className={classNames(c.borderBottom)} />
                            <center>
                                <div target='_blank' href='https://caard.club' style={{ textDecoration:'none'}} className={classNames(c.text)}>Powered by Caard</div>
                            </center>
                            <div className={classNames(c.fNote)}>
                                <p> © Caard Club 2022</p>
                                <p>caard.club</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Theme2;