import Close from '@material-ui/icons/Close'
import pogchamp from '../Images/pogchamp.png'
import pogchampgrey from '../Images/pogchampgrey.png'
import * as React from 'react'

interface IState{
    gameList:any,
    showInfo:boolean
    currentGame: any
}

interface IProps{
    mount:any
    isLoggedIn: boolean
}

export default class GameList extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {
            currentGame: null,
            gameList: [],
            showInfo: false
        }
        this.updateList();
    }

    public componentDidMount = () =>{
        this.props.mount(this.updateList)
        this.updateList();
    }

    public updateList = () => {
        fetch('https://msapoggamesapidevops.azurewebsites.net/api/Games',{
            method:'GET'
        }).then((response:any) => {
            return response.json();
        }).then((response:any)=>{
            const output:any[] = []
            response.forEach((game:any) => {
                const row = (<tr>
                     {this.props.isLoggedIn ? <td className="align-middle" onClick={() => this.handleLike(game)}>{game.isFavourite === true?<img src={pogchamp} width="50px"/>:<img src={pogchampgrey} width="50px"/>}</td> : null}
                    <td className="align-middle" onClick={() => this.showInfo(game)}><img src={game.coverImageUrl} width="70px"/></td>
                    <td className="align-middle" onClick={() => this.showInfo(game)}><b>{game.gameName}</b></td>
                    <td className="align-middle" onClick={() => this.showInfo(game)}><b>{game.gameCompany}</b></td>
                    <td className="align-middle" onClick={() => this.deleteGame(game.gameId)}><Close/></td>                    
                    </tr>)
                if(game.isFavourite){
                    output.unshift(row);
                }else{
                    output.push(row);
                }
            })
            this.setState({gameList:output})
            });
    }

    public deleteGame = (id:any) => {
        fetch("https://msapoggamesapidevops.azurewebsites.net/api/Games/"+id,{
            method:"DELETE"
        }).then(()=>{
            this.updateList()
        })
    }

    public handleLike = (game:any) =>{
        const toSend = [{
            "from":"",
            "op":"replace",
            "path":"/isFavourite",
            "value":!game.isFavourite,
        }]
        fetch("https://msapoggamesapidevops.azurewebsites.net/api/Games/update/"+game.gameId,{
            body:JSON.stringify(toSend),
            headers: {
                Accept: "text/plain",
                "Content-Type":"application/json-patch+json"
            },
            method:"PATCH"
        }).then(()=>{this.updateList()})
    }

    public showInfo = (game:any) => {
        this.setState({currentGame: game,
                        showInfo: true});
    }


    

    public render() {
        return (
            <div className="gamerow">
                <div className="gamecolumn">
                    {this.state.showInfo ? <div className="currentGame">
                                            <div className="inforow">
                                                <div className="infocolumn left">
                                                    <tr margin-bottom="10px">
                                                        <td className="closeInfo" onClick={() => this.setState({showInfo:false})}><Close/></td>   
                                                    </tr>
                                                    <tr>
                                                        <td><img src={this.state.currentGame.coverImageUrl} width="70%"/></td>
                                                    </tr>
                                                </div>
                                                <div className="infocolumn right">
                                                    <table className="infotable">
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Name :</span></td>
                                                            <td className="info">{this.state.currentGame.gameName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Company :</span></td>
                                                            <td className="info">{this.state.currentGame.gameCompany}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Summary :</span></td>
                                                            <td className="info">{this.state.currentGame.gameSummary}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Genre :</span></td>
                                                            <td className="info">{this.state.currentGame.genre}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Age Rating :</span></td>
                                                            <td className="info">{this.state.currentGame.rating}</td>
                                                        </tr>
                                                    </table>
                                                </div>    
                                            </div>
                                     </div> : null}
                    <div className="game-list">
                    <h1 className="gameList-heading"><span className="pink-heading">Games</span> List</h1>
                    <table className="table">
                            <tr>
                                {this.props.isLoggedIn ? <th>Favourite</th> : null} 
                                <th>Image</th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Delete</th>
                            </tr>
                            <tbody className="characterTable">
                                    {this.state.gameList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}