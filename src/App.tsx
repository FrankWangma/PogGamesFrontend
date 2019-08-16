import * as React from 'react';
import CharacterArea from 'src/Components/CharacterArea';
import Header from 'src/Components/Header';
import GameList from 'src/Components/GameList';
import Footer from 'src/Components/Footer';
import FacebookLogin from 'react-facebook-login';
import FacebookLogo from 'src/Images/facebookicon.png';
import 'src/App.css';

interface IState {
    gameList:object,
    gameName: string,
    isCharShowing: boolean,
    isGameShowing: boolean,
    isLoggedIn: boolean,
    updateGameList:any,
    userName: string,
    userId: any,
    
}

class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      gameList:[],
      gameName:"",
     
      isCharShowing: false,
      isGameShowing: true,
      isLoggedIn: false,
      updateGameList:null,
      userId:"",
      userName: ""
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

  public logout = () => {
    this.setState({
      isLoggedIn: false,
      userId:"",
      userName:""
    })
  }

  
  public render() {

    const responseFacebook = (response:any) => {
      this.setState({
        isLoggedIn: true,
        userId: response.userId,
        userName: response.name
      })
    }
  
    return (<div>
      
      <Header />
      <div className="buttonArea">
        <div className="container">
          <button className="appButton" onClick={() => this.displayGame()}><b>Games List</b></button>
          <button className="appButton" onClick={() => this.displayChar()}><b>Characters List</b></button>
          {this.state.isLoggedIn ? <button className="facebooklogout"onClick={() => this.logout()}><img className= "facebooklogo" src={FacebookLogo} />Logout</button>
          : 
          <FacebookLogin
            appId="2356430587914055" 
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />}
          {this.state.isLoggedIn ? <h5 className="pink-heading" margin-top="10px">Welcome, <span className="username">{this.state.userName}</span></h5> : null }
        </div>
      </div>
        <div className="container">
          <div>
            {this.state.isGameShowing ? <GameList mount={this.gameList} isLoggedIn={this.state.isLoggedIn} addGame={this.addGame} /> : null}
          </div>     
          <div>
            {this.state.isCharShowing ? <CharacterArea currentGame={this.state.gameName}/> : null}
          </div>
        </div>
        <div className="push" />
        <Footer />
     </div>
    
    )
  }
}

export default App;