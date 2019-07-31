import axios from 'axios'

export const appSetup = () =>{
    return (dispatch) =>{
        let posts = localStorage.getItem("Posts")
        if(posts === null) {
            axios.get('http://www.mocky.io/v2/5d40b2a43100006b00538fd1')
            .then(res => {
                localStorage.setItem("Posts", JSON.stringify(res.data))
                
            })
        } else {
            posts = JSON.parse(posts)
            dispatch({
                type: 'ADD_POST',
                data: posts
            })
        }
        
        let users = localStorage.getItem("user")
        if(users === null) {
            localStorage.setItem("userDetail", JSON.stringify([]))
            axios.get('http://www.mocky.io/v2/5d40b2f83100007000538fd5')
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data))
                dispatch({
                type: 'ADD_USER',
                userData: res.data
                })
            })
        }else {
            users = JSON.parse(users)
            dispatch({
                type: 'ADD_USER',
                userData: users
            })
        }
        

        // axios.get('https://my.api.mockaroo.com/posts.json?key=f2cb5d10')
        // .then(res => dispatch({
        //     type: 'ADD_POST',
        //     data: res.data
        // }))
    }
}
