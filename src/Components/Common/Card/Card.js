import React from 'react';
import {Card,CardHeader,CardActions,Typography,CardContent,CardActionArea,CardMedia,withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    card: {
      maxWidth: 500,
      margin:'0 auto',
    },
    media: {
        width:"100%",
        height: '200px'
      },
    head: {
        textAlign: 'center',
        background:'#0B3763',
        color:'white',
        letterSpacing: '3px',
        fontSize:'40px',
        padding:'40px 0px',
    },
    actions:{
        padding:'0px 9px',
    }
})

const CustomizedCard = (props) =>{
    const{classes,children,title,cls,img,getButtons} = props;
    return(
        <Card className={`${classes.card} ${cls}`}>        
            {img && <CardMedia
                className={classes.media}
                image={img}
               
                />}
                {title && (
                <CardHeader className={classes.head} 
                    title={<Typography className={classes.typoText} variant="h4">{title}</Typography>}
                />
            )}
            <CardContent className={classes.contentPad}>{children}</CardContent>        
            {getButtons && <CardActions className={classes.actions}>{getButtons}</CardActions>}
        </Card>
    )
}

export default withStyles(styles)(CustomizedCard);
