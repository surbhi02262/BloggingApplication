const initialState={
    Users:[],
}
export default (state=initialState,action) =>{
    switch(action.type){
        case "ADD_USER" :{
            return {
                ...state,
                // ...Object.assign(state.Users, action.userData)
                Users:action.userData
                
            }
        }
        default : return state
    }
}