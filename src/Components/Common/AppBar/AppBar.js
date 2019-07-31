import React from 'react'
import {Typography,Button,Toolbar,AppBar,withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {handleLogout} from '../../../Store/Login/actionCreator';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';

const styles = {  
    title: {
      flexGrow: 1,
    },
    appcolor:{
        background: '#0B3763',
    }
  }

const ApplicationBar = (props) =>{
    const { classes,isLoggedIn ,handleLogout} = props;
    return (
            <AppBar position="static" className={classes.appcolor}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="button-link primary" to="/">Blogging App</Link>
                    </Typography>                  
                   {isLoggedIn 
                    ? <>
                       {props.location.pathname !== "/addPost" && <Link className="button-link primary pad" to="/addPost">Add Post</Link>}
                       {props.location.pathname !== "/" &&   <Link className="button-link primary pad" to="/">Display Posts</Link>}
                        <Button onClick={() => handleLogout()} color="inherit">Logout</Button>
                      </>
                    :<>
                      {props.location.pathname !== "/addPost" && <Link className="button-link primary pad" to="/addPost">Add Post</Link>}
                      {props.location.pathname !== "/" &&   <Link className="button-link primary pad" to="/">Display Posts</Link>}
                      {props.location.pathname !== "/login" &&  <Link className="button-link primary pad" to="/login">Login</Link>}
                      {props.location.pathname !== "/signUp" &&   <Link className="button-link primary pad" to="/signUp">Sign Up</Link>}

                    </>
                    }
                </Toolbar>
            </AppBar>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.Login.status
})
const mapDispatchToProps = {
    handleLogout
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ApplicationBar)));
