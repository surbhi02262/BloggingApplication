import React, { Component } from 'react';
import InputField from '../InputField/InputField';
import Card from '../Card/Card';
import Button from '../Button/Button';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getConfig} from '../../../Services/Configs'
import {CreatePostConfig} from './PostConfig'
import {editPostt} from '../../../Store/Post/actionCreator';
import Notification from '../SnackBar/SnackBar';

let editPostData ={}
class EditPost extends Component {
    state={
        open:false,
        message:""
    }
    handleNotification = () =>{
        this.setState({open:false});
    }
    handleChange =(name,value)=>{
        editPostData[name]=value;
    }
    handleEditChange = (dataToEdit) =>{
        let that = this
        this.setState({open:true,message:"Editing Post..."}, function(){
            setTimeout(function(){
                that.props.editPostt(editPostData)
            },2000)
            
        });
        

    }
    getPostDataById = () => {
        return this.props.postData.filter(post => post.id === parseInt(this.props.match.params.PostId))  
    }
    componentDidMount(){
        editPostData=this.getPostDataById()[0];
    }
    render() {      
        const{postData}= this.props;
        const{open,message} = this.state;

        let filteredData = postData.length >  0 ? this.getPostDataById() :[];
        if(filteredData.length === 0) {
            this.props.history.push('/')
        }
        let config = getConfig(filteredData[0], CreatePostConfig)
        if(this.props.isEditSuccess){
            this.props.history.push('/');
        }
        return (
            <div className="login-container">
            <Card title="Edit POST">
                <div className="form-container">
                    {config.map(({name,type,placeholder,value}) => type === 'file' 
                    ? <>
                    <img src={value} alt="image" style={{
                        width:"100%",
                        height: '200px'
                    }}/>
                    <InputField value={""} name={name} type={type} 
                                    placeholder={placeholder} onChange={this.handleChange}/>
                    </> 
                    : <InputField value={value} name={name} type={type} 
                                    placeholder={placeholder} onChange={this.handleChange}/>)}
                    <Button onClick={() => this.handleEditChange(filteredData)}>Edit Post</Button>
                </div>
            </Card>
            <Notification open={open} onClose={this.handleNotification} message={message}/>

        </div>
        );
    }
}
const mapStateToProps = (state) => ({
       postData:  state.Post.Posts,
       isEditSuccess: state.Post.isPostSuccessful
})
const mapDispatchToProps ={
    editPostt
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditPost));