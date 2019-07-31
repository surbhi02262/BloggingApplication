import React from 'react';
import {Button} from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    margin: {
      marginTop: '20px',
      padding: '12px',
    },
    btn:{
        width:'100%',
        background: '#0B3763',
        fontSize:'17px',
        '&:hover':{
            background: '#0B3763',
        }
    },
})

const CustomizedButtons =(props)=> {
    const { classes,children ,classNam} = props;
        return (
            <Button variant="contained" color="primary" {...props}
                className= { classNam ||  classNames(classes.margin, classes.btn)}>
                    {children}
            </Button>
        );
}

export default withStyles(styles)(CustomizedButtons);
