import * as React from 'react';
import CharacterArea from 'src/Components/CharacterArea';
import Header from 'src/Components/Header';
import GameList from 'src/Components/GameList';
import Footer from 'src/Components/Footer';
import FacebookLogin from 'react-facebook-login';
import 'src/App.css';

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

    const responseFacebook = (response:any) => {
      console.log(response);
    }
  
    return (<div>
      
      <Header addGame={this.addGame} />
      <div className="buttonArea">
        <div className="container">
          <button className="appButton" onClick={() => this.displayGame()}><b>Game List</b></button>
          <button className="appButton" onClick={() => this.displayChar()}><b>Character</b></button>
          <FacebookLogin
            appId="2356430587914055" 
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>

      </div>
        <div className="container">
          <div>
            {this.state.isGameShowing ? <GameList mount={this.gameList}/> : null}
          </div>     
          <div>
            {this.state.isCharShowing ? <CharacterArea currentGame={this.state.gameName}/> : null}
          </div>
        </div>
        <Footer />
     </div>
    
    )
  }
}

export default App;