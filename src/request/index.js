//使用axios进行异步操作
import axios from "axios"
import {message} from "antd"
message.config({
    top: 200
})
const isDev = process.env.NODE_ENV === "development"
//   /api/v1/articleList
const service = axios.create({
    baseURL: isDev? "http://rap2api.taobao.org/app/mock/235428" : ''
})


//axios的拦截器 （请求之前的拦截、响应之后的拦截）
//请求之前的拦截作用： 可以在每次发送请求之前，可以在请求头上面携带一些数据传送给后端。
service.interceptors.request.use(config=>{
    //console.log("config",config) //token放入localStorage.getItem("authToken")
    // config.data = {...config.data,"authToken":"asldaslkjaslkdsad"}
    config.data = Object.assign({},config.data,{
        autoToken:"saldjalsdjal"
    })
    return config;
})

//响应之后的拦截操作  根据后端返回给你的状态码进行业务操作判断。
service.interceptors.response.use(res=>{
    if(res.data.code === 200){
        return res.data.data;
    }else{
        message.error(res.data.errMsg)
    }
})

export const getArticle = (offset,limited)=>{
    return service.post("api/article/list",{offset,limited})
}

export const deleteArticleById = (offset,limited)=>{
    return service.post("api/article/list",{offset,limited})
}