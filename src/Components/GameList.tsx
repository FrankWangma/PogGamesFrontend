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
                    <td className="align-middle" onClick={() => this.handleLike(game)}>{game.isFavourite === true?<img src={pogchamp} width="50px"/>:<img src={pogchampgrey} width="50px"/>}</td>
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
                                            {this.state.currentGame.gameName}
                                     </div> : null}
                    <div className="game-list">
                    <h1 className="gameList-heading"><span className="pink-heading">Games</span> List</h1>
                    <table className="table">
                            <tr>
                                <th>Favourite</th>
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