import Close from '@material-ui/icons/Close'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'

interface IState{
    gameList:any
}

interface IProps{
    play:any,
    mount:any,
}

export default class GameList extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {
            gameList: [],
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
                    <td className="align-middle" onClick={() => this.handleLike(game)}>{game.isFavourite === true?<Star/>:<StarBorder/>}</td>
                    <td className="align-middle"><img src={game.coverImageUrl} width="70px"/></td>
                    <td className="align-middle"><b>game.gameName</b></td>
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

    public render() {
        return (
            <div className="game-list">
            <h1 className="play-heading"><span className="red-heading">name</span>game</h1>
            <table className="table">
                {this.state.gameList}
            </table>
            </div>
        )
    }
}