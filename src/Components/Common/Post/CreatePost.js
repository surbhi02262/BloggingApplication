import React, { Component } from 'react';
import {CreatePostConfig} from './PostConfig';
import InputField from '../InputField/InputField';
import Card from '../Card/Card';
import Button from '../Button/Button';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addPostMessage} from '../../../Store/Post/actionCreator';
import Notification from '../SnackBar/SnackBar';
let post={}
class CreatePost extends Component {
    state={
        open:false,
        message:""
    }
    handleNotification = () =>{
        this.setState({open:false});
    }
    handleChange =(name,value)=>{
        if(name === 'image') {
            console.log("Images : ",value)
        }
        post[name]=value;
    }
    addPost = () =>{
       // this.handleNotification(true, )
       let that = this
        this.setState({open:true,message:"Adding Post..."}, function(){
            setTimeout(function(){
                that.props.addPostMessage(post);
            },2000)
            
        });
        
    }
    handleCancel = () =>{
        this.props.history.push('/');
    }

    render() {
        const{open,message} = this.state;
        if(this.props.success) {
            this.props.history.push('/');
        }
        return (
            <div className="login-container">
                <Card title="ADD POST">
                    <div className="form-container">
                        {CreatePostConfig.map(({name,type,placeholder}) => <InputField name={name} type={type} 
                                    placeholder={placeholder} onChange={this.handleChange}/>)}
                        <Button onClick={this.addPost} style={{width:'30%',margin:'9px 8px'}}>Add Post</Button>
                        <Button style={{width:'30%',margin:'9px 8px'}} onClick={() => this.handleCancel()}>Cancel</Button>
                    </div>
                </Card>
                <Notification open={open} onClose={this.handleNotification} message={message}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        success: state.Post.isPostSuccessful
    }
}
const mapDispatchToProps ={
    addPostMessage
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CreatePost));