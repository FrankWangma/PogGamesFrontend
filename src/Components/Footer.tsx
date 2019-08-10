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
               </div>
            </div>
            </div>
        )
    }
}