
import {requestLogin} from "../request"
import actionTypes from "./actionTypes"
// const startLogin = ()=>{
//     return {
//         type:actionTypes.START_LOGIN
//     }
// }
const loginSuccess = (userInfo)=>{
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}

const loginFailed = ()=>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("users")
    sessionStorage.removeItem("authToken")
    sessionStorage.removeItem("users")
    return {
        type:actionTypes.LOGIN_FAILED
    }
}

export const login = (userInfo)=>{
    return dispatch=>{
        requestLogin(userInfo).then(res=>{
            if(res.data.code===200){
                 const {authToken,...users} = res.data.data
                if(userInfo.remember){
                    localStorage.setItem("authToken",authToken)
                    localStorage.setItem("users",JSON.stringify(users))
                }else{
                    sessionStorage.setItem("authToken",authToken)
                    sessionStorage.setItem("users",JSON.stringify(users))
                }
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(loginFailed())
            }
        })
        // requestLogin(userInfo).then(res=>{
        //     console.log(res.data)
        // })
    }
}