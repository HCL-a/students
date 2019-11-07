import actionTypes from "../actions/actionTypes"
const isLogin = Boolean(localStorage.getItem("authToken")) || Boolean(sessionStorage.getItem("authToken")) 
const users = JSON.parse(localStorage.getItem("users")) || JSON.parse(sessionStorage.getItem("users"))

const initState = {
    ...users,
    isLogin
}

export default (state=initState,action)=>{
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
           
            return {
                ...state,
                ...action.payload.userInfo,
                isLogin:true
            }
        case actionTypes.LOGIN_FAILED: 
        console.log(111111)
            return {
                id:"",
                username:"",
                isLogin:false
            }
        default:
            return state;
    }
}