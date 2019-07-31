import React, { Component } from 'react';
import  Card  from '../Card/Card';
import {connect} from 'react-redux';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import {setSuccessfalse,deletePost} from '../../../Store/Post/actionCreator';
import {Link} from 'react-router-dom';
import IMG from '../../../Images/newYork.jpg';
import Typography from '@material-ui/core/Typography';
import InputField from '../InputField/InputField'
import _ from 'lodash';
import Notification from '../SnackBar/SnackBar';

class DisplayPost extends Component {
    state={
        search:'',
        open:false,
        message:""
    }
    componentDidMount(){
       this.props.setSuccessfalse();
    }
    handleNotification = () =>{
        this.setState({open:false});
    }
    deletePost = (data) =>{
            let that = this
            this.setState({open:true,message:"Deleting Post..."}, function(){
                setTimeout(function(){
                    that.props.deletePost(data);

                },2000)
                
            });
    }
    handleSearch = (name,value) =>{
        this.setState({search:value})
    }
    getButtons = (data) => this.props.isLoggedIn 
                        ?  <>
                            <div><Link to={`/edit/${data.id}`} className="edit">EDIT POST</Link></div>
                            <Button size="small" color="primary" onClick={() => this.deletePost(data)}>
                                Delete Post
                            </Button>
                          </>
                        : ""
                
    getUser = (id) => {
        let cuser = this.props.users.filter(user => user.id === id)
        if(cuser.length > 0 ){
            return <div style={{display: 'flex',padding:'4px 0px'}}>
                    <img src={cuser[0].profile_image || IMG} className="user-profile-img"/> 
                    <div className="user-name-info">{cuser[0].name}</div>
                </div>
        } else {
                return <div style={{display: 'flex',padding:'4px 0px'}}>
                    <img src={IMG} className="user-profile-img"/> 
                    <div className="user-name-info">Anyonmus USer</div>
                </div>
        }
    }
    
    getTime = (data) =>{
        return <div className="post-box-sample"> {moment(new Date(data.posted_at), "YYYYMMDD").fromNow()}</div>
    }
    shouldComponentUpdate(nextProps) {
 
        return nextProps.postData.length > 0
    }
    render() {
        const{postData,deletedPostStatus,isLoggedIn} = this.props;
        const{open,message} = this.state;

        let filteredData = this.state.search.length > 0  && postData.filter(data => data.message.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) 
        let displayData= this.state.search.length > 0  ? filteredData : postData;
        displayData= _.sortBy(displayData, [function(o) { return o.posted_at; }]);
        displayData.reverse()
        return (
            <div className="post-container">
                <div>
                    <div style={{width:'80%',display:'inline-block'}}></div>
                    <div style={{display:'inline-block'}}>
                        <InputField type="text" name="search" placeholder="Search By Messages" onChange={this.handleSearch}/>
                    </div>
                </div>
                {postData.length > 0 && displayData.map(data => 
                
                    <div className="post-info">
                        <Card cls="post-card" img={data.image || IMG} getButtons={this.getButtons(data)}>
                            <Typography gutterBottom variant="h5" component="h2" className="remove-pad">
                                {data.title}
                            </Typography>
                            <div className="post-information-container">
                               <span className="post-box">{this.getUser(data.user_id)}</span>
                                <span className="post-box time">{this.getTime(data)}</span>
                                <div style={{width: '100%', border: '2px solid #f3f3f3',margin:1}}/>
                                <div className="post-box"> {data.message}</div>
                                
                                {/* <div className="post-box">Time : {moment(new Date(data.posted_at), "YYYYMMDD").fromNow()}</div> */}
                                {/* {isLoggedIn 
                                ?   <>
                                    <div><Link to={`/edit/${data.id}`}>Edit Post</Link></div>
                                    <div><Button className="btn-delete" onDeletePost={() => this.deletePost(data)}>Delete Post</Button></div>
                                    </> 
                                : ""
                                } */}
                            </div>
                        </Card>
                        <Notification open={open} onClose={this.handleNotification} message={message}/>

                    </div>)}
            </div>
        );
    }
}

const mapStateToProps= (state) =>({
    isLoggedIn: state.Login.status,
    postData: state.Post.Posts,
    deletedPostStatus : state.Post.isPostDeleted,
    users: state.SignUp.Users 
})

const mapDispatchToProps = {
    setSuccessfalse,
    deletePost
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayPost)