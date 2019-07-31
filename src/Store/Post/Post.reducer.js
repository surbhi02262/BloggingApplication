const initialState={
    Posts:[],
    isPostSuccessful:false,
    isPostDeleted:false,
}

export default  (state=initialState,action) =>{
    switch(action.type){
        case "ADD_POST" :{
            return {
                ...state,
                Posts: action.data,
                isPostSuccessful:true,
                isPostDeleted:false,
            }
        };
        case "ADD_POST_ANONYMOUS":{
            let post = state.Posts;
            post.push(action.data);
            return {
                ...state,
             //   Posts:post,
                Posts: action.data,
                isPostSuccessful:true,
                isPostDeleted:false
            }
        };
        case "SUCCESS_FALSE":{
            return {
                ...state,
                isPostSuccessful:false,
                isPostDeleted:false
            }
        }
        case "DELETE_POST" :{
            return {
                ...state,
                Posts:action.data,
                isPostDeleted:true,
                isPostSuccessful:false,

            }
        }
        case "EDIT_POST":{
            return {
                ...state,
                Posts:action.data,
                isPostDeleted:false,
                isPostSuccessful:true,

            }
        }
        default :return state
    }
}