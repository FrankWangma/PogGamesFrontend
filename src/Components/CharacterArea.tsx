import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import * as React from 'react'

interface IState {
    input: string,
    isShowing: boolean,
    result: any,
    body:any,
    characters: any
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
            input:"",
            isShowing: true,
            result:[],
            
        }
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
                character.game = this.getGameName(character.gameId);
                output.push(character);
            })
            this.setState({characters:output})
            });
    }
    
    public getGameName = (id: string) => {
        let game = "";
        fetch('https://msapoggamesapidevops.azurewebsites.net/api/Games/' + id ,{
            method:'GET'
        }).then((response:any) => {
            return response.json();
        }).then((response:any)=>{
             game = response.gameName;
             return game;
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
                        <td><img src={character.charImageUrl} width="50px"/></td>
                        <td><b>{character.charName}</b> </td>
                        <td>{game.gameName}</td>
                    </tr>
                )
            });
        });
        if (toRet.length === 0){
            if(this.state.input.trim() === ""){
                const error = <div><p>Sorry you need to search</p></div>
                this.setState({body:error})
            }else{
                const error = <div><p>Sorry no results returned</p></div>
                this.setState({body:error})
            }
        }else{
            this.setState({body:toRet})
        }
    }



    public render() {
        return (
            <div className="character-area-container">
                <div className="character-area">
                <div className="row">
                    <div className="col-2 justify-content-center align-self-center">
                        <h1><span className="pink-heading">Search </span>Characters</h1>
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
                        {this.getCharacterList()}
                        {this.state.isShowing ? this.state.characters.map((character:any) => (
                            <tr>
                                <td><img src={character.charImageUrl} width="50px"/></td>
                                <td><b>{character.charName}</b></td>
                                <td>{character.game}</td>
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