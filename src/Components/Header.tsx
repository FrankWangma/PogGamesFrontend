import * as React from 'react';


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
                            <h1><span className="pink-heading">PoG</span>Games</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
