import React, { Component } from 'react';
import {LoginConfig} from './LoginConfig';
import { Paper } from '@material-ui/core';

import InputField from '../Common/InputField/InputField';
import Card from '../Common/Card/Card';
import Button from '../Common/Button/Button';
import {validateUser} from '../../Store/Login/actionCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

let loginData={}
class Login extends Component {
    handleChange =(name,value)=>{
        loginData[name]=value;
    }
    onSubmit = () =>{
        this.props.validateUser(loginData);
        
    }
    render() {
        if(this.props.checkStatus){
            this.props.history.push('/')
        }
        return (
                <Paper className="login-container">
                    <div className="backdrop">
                    <div className="login-wrapper">
                    <Card title="LOGIN">
                        <div className="form-container">
                            {LoginConfig.map(({name,type,placeholder}) => <InputField name={name} type={type} 
                                        placeholder={placeholder} onChange={this.handleChange}/>)}
                            <Button onClick={this.onSubmit}>Login</Button>
                        </div>
                    </Card>
                    </div>
                    </div>
                </Paper>
        );
    }
}
const mapDispatchToProps ={
    validateUser
}
const mapStateToProps = (state) => {
    const { Login } = state;
    
    return {
        checkStatus: Login.status

    }

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));