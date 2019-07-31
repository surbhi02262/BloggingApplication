export const addUser  =(data) => {
    return (dispatch, getState) => {
        let userData = localStorage.getItem("user")
        if(userData !== null) {
            userData = JSON.parse(userData)
            data.id= Math.floor((Math.random() * 100)+21); 
            userData.push(data)
            localStorage.setItem('user',JSON.stringify(userData));
        } else {
            localStorage.setItem('user',JSON.stringify([data]));
        }
      
        
        console.log("data ",data)
        dispatch({
            type: 'ADD_USER',
            userData,
        })
    }
}