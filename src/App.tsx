import * as React from 'react';
import CharacterArea from 'src/Components/CharacterArea';
import Header from 'src/Components/Header';
import GameList from 'src/Components/GameList';
import 'src/App.css'

interface IState {
    gameList:object,
    gameName: string,
    updateGameList:any
}

class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      gameList:[],
      gameName:"",
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

  public updateName = (name:string) => {
    if(this.state.gameName === name){
      this.setState({gameName:""},()=>this.setState({gameName:name}))
    }else{
      this.setState({gameName:name})
    }
  }

  public gameList = (callback:any) => {
    this.setState({updateGameList:callback})
  }


  public render() {
    return (<div>
      <Header addGame={this.addGame} />
      <div className="container">
        <GameList play = {this.updateName} mount={this.gameList}/>

        <CharacterArea currentGame={this.state.gameName} play={this.updateName}/>
      </div>
    </div>)
  }
}

export default App;