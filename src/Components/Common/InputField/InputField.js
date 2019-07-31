import React from 'react';
import {TextField} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#0B3763',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#0B3763',
    },
    '& .MuiInputLabel-outlined': {

        color: '#0B3763',
        fontSize: '14px',
    },
    '& .MuiOutlinedInput-input': {
        padding: '16px 14px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#0B3763',
        },
        '&:hover fieldset': {
            borderColor: '#0B3763',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0B3763',
        },
    },
},
})(TextField);

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textcls: {
      width:'100%',
      margin:'10px 0px'
    },
  }));

const InputField = (props) => {
    const{type,name,placeholder, value,className} = props;
    const classes = useStyles();   

    const handleChange = (name,value) =>{
        props.onChange(name,value)
    }
    const toDataURL = (element) => {
        console.log("ele", element)
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log('RESULT', reader.result)
          props.onChange(name,reader.result)
        }
        reader.readAsDataURL(file);
      }
   
    if(type === "multiline"){
      return <div className={classes.formGroup}>
                    <textarea col="100" className="text-cls"
                        style={{width: '94%', height: 100, padding: 10,borderRadius: 6,resize: 'none', outline:'none',border:'1.4px solid #0B3763',fontSize: 16}}
                        row="6" placeholder={placeholder}    
                        onChange={(e) =>handleChange(name,e.target.value)}>
                        {value ? value : ""}
                    </textarea>
            </div>
    }
    
  
    return (
        <div className={classes.formGroup}>
            <CssTextField
            type={type} name={name}
            className={classes.textcls || className}
            label={placeholder}
            defaultValue={value? value:""}
            variant="outlined"
            id="custom-css-outlined-input"
            onChange={(e) => type === 'file' ? toDataURL(e.target) :  handleChange(name,e.target.value)}/>
        </div>
    );
}

export default InputField;