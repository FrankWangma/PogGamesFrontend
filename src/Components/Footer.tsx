import * as React from 'react';
import {
    FacebookShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    RedditShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    RedditIcon,
    EmailIcon,
  } from 'react-share';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faGithub,
    faFacebook,
    faLinkedin,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
  

export default class Footer extends React.Component<{}> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="footer">
                <div className="container">
               <div className="row" >
                <h1 className="footer-heading"><span className="pink-heading">Share </span> on Social Media</h1>
                <div className="col">
                <h1 className="footer-follow"><span className="pink-heading">Follow Me </span>on: </h1>
                </div>
               </div>
               <div className="row">
                    <div className="shareIcons">
                        <FacebookShareButton
                        url="https://poggames.azurewebsites.net/"
                        quote="PoGGames: Look at them games"
                        hashtag="#Games">
                              <FacebookIcon
                                    size={40}
                                    round={true} />
                        </FacebookShareButton>
                    </div>
                    <div className="shareIcons">
                        <TwitterShareButton
                        url="https://poggames.azurewebsites.net/"
                        title="PoGGames: Look at them games"
                        >
                              <TwitterIcon
                                    size={40}
                                    round={true} />
                        </TwitterShareButton>
                    </div>
                    <div className="shareIcons">
                        <WhatsappShareButton
                        url="https://poggames.azurewebsites.net/"
                        title="PoGGames: Look at them games"
                        >
                              <WhatsappIcon
                                    size={40}
                                    round={true} />
                        </WhatsappShareButton>
                    </div>
                    <div className="shareIcons">
                        <RedditShareButton
                        url="https://poggames.azurewebsites.net/"
                        title="PoGGames: Look at them games"
                        >
                              <RedditIcon
                                    size={40}
                                    round={true} />
                        </RedditShareButton>
                    </div>
                    <div className="shareIcons">
                        <LinkedinShareButton
                        url="https://poggames.azurewebsites.net/"
                        >
                              <LinkedinIcon
                                    size={40}
                                    round={true} />
                        </LinkedinShareButton>
                    </div>
                    <div className="shareIcons">
                        <EmailShareButton
                        url="https://poggames.azurewebsites.net/"
                        subject="PoGGames: Look at them games"
                        >
                              <EmailIcon
                                    size={40}
                                    round={true} />
                        </EmailShareButton>
                    </div>

                    <div className="col">
                        <div className="followiconcontainer">
                        <a
                        href="https://www.facebook.com/frank.wangma.5"
                        target="_blank"
                        className="profileicons"
                        >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="https://github.com/FrankWangma"
                        target="_blank"
                        className="profileicons">
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                        <a
                        href="www.linkedin.com/in/frank-wangma"
                        target="_blank"
                        className="profileicons"
                        >
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                        <a
                        href="https://www.instagram.com/frank_wangma/"
                        target="_blank"
                        className="profileicons">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        </div>
                    </div>
               </div>
            </div>
            </div>
        )
    }
}