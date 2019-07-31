const initialState={
    loggedInUser:{},
    status:false,
}

export default (state=initialState,action) =>{
    switch(action.type){
        case "VALIDATE_USER" :{
            return{
                ...state,
                loggedInUser: action.data,
                status:true,
            }
        }
        case "LOGOUT" :{
            return {
                ...initialState
            }
        }
        default : return state
    }
}