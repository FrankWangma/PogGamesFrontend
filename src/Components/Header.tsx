import * as React from 'react';
import logo from 'src/Images/poGGamesicon.png';


export default class Header extends React.Component {
    public constructor(props:any){
        super(props);
    }

    public render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-2 justify-content-center align-self-center">
                            <img src={logo} width="150px"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
