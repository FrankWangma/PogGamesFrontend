import * as React from 'react';
import CharacterArea from 'src/Components/CharacterArea';
import Header from 'src/Components/Header';
import GameList from 'src/Components/GameList';
import 'src/App.css'

interface IState {
    gameList:object,
    gameName: string,
    isCharShowing: boolean,
    isGameShowing: boolean,
    updateGameList:any,
    
}

class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      gameList:[],
      gameName:"",
      isCharShowing: false,
      isGameShowing: true,
      updateGameList:null,
      
    }
  }

  public addGame = (name: string) =>{
    const body = {"gameName":name}
    fetch("https://msapoggamesapidevops.azurewebsites.net/api/Games",{
      body:JSON.stringify(body),
      headers:{
        Accept:"text/plain",
        "Content-Type":"application/json"
      },
      method:"POST"
    }).then(()=>{
      this.state.updateGameList()
    })
  }

  public gameList = (callback:any) => {
    this.setState({updateGameList:callback})
  }

  public displayGame = () => {
    this.setState({
        isCharShowing: false,
        isGameShowing: true,
        
    })
  }

  public displayChar = () => {
    this.setState({
        isCharShowing: true,
        isGameShowing: false
    })
  }


  public render() {
    return (<div>
      <Header addGame={this.addGame} />
      <div className="buttonArea">
        <div className="buttonContainer">
          <button className="appButton" onClick={() => this.displayGame()}><b>Game List</b></button>
          <button className="appButton" onClick={() => this.displayChar()}><b>Character</b></button>
        </div>
      </div>
      <div className="container">
          {this.state.isGameShowing ? <GameList mount={this.gameList}/> : null}     
        <div>
          {this.state.isCharShowing ? <CharacterArea currentGame={this.state.gameName}/> : null}
        </div>
      </div>
    </div>)
  }
}

export default App;