import React,{Component} from 'react';
import '../Styles/App.css';
import {Switch,Route, Redirect} from 'react-router-dom';
import SignUp from './SignUp/SignUp.js';
import AppBar from './Common/AppBar/AppBar';
import Login from './Login/Login';
import Home from './Home/Home';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLogggedInUser} from '../Store/Login/actionCreator';
import CreatePost from './Common/Post/CreatePost';
import DisplayPost from './Common/Post/DisplayPost';
import EditPost from './Common/Post/EditPost';
import {appSetup} from '../Store/App/action'
class  App extends Component {
  componentDidMount(){
    this.props.appSetup();
  }
  render(){
    const {isLogedIn} = this.props
    return (
      <div className="App">
        <AppBar msg="Post Deleted Successfully"/>
        {isLogedIn ? <Switch>
          <Route exact path="/" component={DisplayPost}/>
          <Route exact path="/addPost" component={CreatePost}/> 
          <Route exact path="/edit/:PostId" component={EditPost}/>   
          <Route exact path="/login" render={() => <Redirect to="/"/>}/>     
        </Switch> 
        : 
        <Switch>
          <Route exact path="/" component={DisplayPost}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/addPost" component={CreatePost}/>

        </Switch>}
      </div>
    );
  }
}
const mapStateToProps = (state) =>({
  isLogedIn: state.Login.status
})
const mapDispatchToProps = {
  appSetup
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
