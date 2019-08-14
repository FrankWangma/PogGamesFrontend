import { IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Close'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import * as React from 'react'

interface IState {
    input: string,
    isShowing: boolean,
    result: any,
    body:any,
    characters: any,
    showInfo: boolean,
    currentChar: any
}

interface IProps {
    currentGame:any,
}

export default class CharacterArea extends React.Component<IProps, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            body:[],
            characters: [],
            currentChar: null,
            input:"",
            isShowing: true,
            result:[],
            showInfo: false,
            
        }
    }

    public componentDidMount = () =>{
        this.getCharacterList()
    }

    public search = () => {
        // Check if its empty
        if(this.state.input.trim() === ""){
            this.setState({result:[]},()=>this.makeTableBody())
        }else{
            fetch("https://msapoggamesapidevops.azurewebsites.net/api/Games/SearchByCharacters/"+this.state.input,{
                headers:{
                    Accept:"text/plain"
                },
                method:"GET"
            }).then((response:any)=>{
                return response.json()
            }).then((response:any)=>{
                this.setState({isShowing: false,
                    result:response},()=>this.makeTableBody())
            })
        }
    }

    public getCharacterList = () => {
        fetch('https://msapoggamesapidevops.azurewebsites.net/api/Characters',{
            method:'GET'
        }).then((response:any) => {
            return response.json();
        }).then((response:any)=>{
            const output:any[] = []
            
            response.forEach((character:any) => {
                this.getGameName(character);
                output.push(character);
            })
            this.setState({characters:output})
            });
    }
    
    public getGameName = async (character:any) => {
        const id = character.gameId;
        const charId = character.apiCharId
        fetch('https://msapoggamesapidevops.azurewebsites.net/api/Games/' + id ,{
            method:'GET'
        }).then((response:any) => {
            return response.json();
        }).then((response:any)=>{
            this.setState(state => {
                const characters = state.characters.map((item:any) => {
                    if(item.apiCharId === charId && item.gameId === id) {
                        item.game = response.gameName;
                        return item;
                    } else {
                        return item;
                    }
                })
                return {
                    characters
                }
            })
             
        });

    }
    

    public makeTableBody = () =>{
        const toRet: any[] = []
        this.state.result.sort((a:any,b:any)=>{
            if(a.gameName === b.gameName){
                return 0;
            }else if(a.gameName === this.props.currentGame){
                return -1;
            }else if(b.gameName === this.props.currentGame){
                return 1;
            }else{
                return a.gameName.localeCompare(b.gameName);
            }
        })
        this.state.result.forEach((game:any) => {
            game.character.forEach((character:any) => {
                toRet.push(
                    <tr>
                        <td onClick={() => this.showInfo(character)}><img src={character.charImageUrl} width="50px"/></td>
                        <td onClick={() => this.showInfo(character)}><b>{character.charName}</b> </td>
                        <td onClick={() => this.showInfo(character)}>{game.gameName}</td>
                    </tr>
                )
            });
        });
        if (toRet.length === 0){
            if(this.state.input.trim() === ""){
                this.setState({isShowing: true});
            }else{
                const error = <div><p>Sorry no results returned</p></div>
                this.setState({body:error})
            }
        }else{
            this.setState({body:toRet})
        }
    }

    public showInfo = (char:any) => {
        this.setState({currentChar: char,
                        showInfo: true});
    }


    public render() {
        return (
            <div className="character-area-container">
                {this.state.showInfo ? <div className="currentGame">
                                            <div className="inforow">
                                                <div className="infocolumn left">
                                                    <tr margin-bottom="10px">
                                                        <td className="closeInfo" onClick={() => this.setState({showInfo:false})}><Close/></td>   
                                                    </tr>
                                                    <tr>
                                                        <td><img src={this.state.currentChar.charImageUrl} width="70%"/></td>
                                                    </tr>
                                                </div>
                                                <div className="infocolumn right">
                                                    <table className="infotable">
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Name :</span></td>
                                                            <td className="info">{this.state.currentChar.charName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Location :</span></td>
                                                            <td className="info">{this.state.currentChar.charCountry}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Description :</span></td>
                                                            <td className="info">{this.state.currentChar.charDescription}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="infotableheading"><span className="pink-heading">Gender :</span></td>
                                                            <td className="info">{this.state.currentChar.charGender}</td>
                                                        </tr>
                                                    </table>
                                                </div>    
                                            </div>
                                     </div> : null}
                <div className="character-area">
                <div className="row">
                    <div className="col-2 justify-content-center align-self-center">
                        <h1><span className="pink-heading">Characters</span> List</h1>
                    </div>
                    <div className="col-10">
                        
                        <TextField
                            id="Search-Bar"
                            className="SearchBar"
                            placeholder="Search Characters"
                            margin="normal"
                            variant="outlined"
                            onChange={(event: any) => this.setState({ input: event.target.value })}
                            value={this.state.input}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => this.search()}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>
                </div>
                <br/>
                <table className="table">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Game</th>
                    </tr>
                    <tbody className="characterTable">
                        {this.state.isShowing ? this.state.characters.map((character:any) => (
                            <tr>
                                <td onClick={() => this.showInfo(character)}><img src={character.charImageUrl} width="50px"/></td>
                                <td onClick={() => this.showInfo(character)}><b>{character.charName}</b></td>
                                <td onClick={() => this.showInfo(character)}>{character.game}</td>
                            </tr>
                        )) : null}
                            {this.state.body}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
} 