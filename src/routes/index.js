import {
    ArticleList,
    ArticleEdit,
    Dashboard,
    Settings,
    Login,
    NotFound
} from "../views"

export const mainRoute = [
    {
        pathname:"/login",
        component:Login
    },
    {
        pathname:"/404",
        component:NotFound
    },
]
export const adminRoute = [
    {
        pathname:"/admin/dashboard",
        title:"仪表盘",
        isNav:true,
        component:Dashboard,
        type:"dashboard"
    },
    {
        pathname:"/admin/article",
        title:"文章列表",
        isNav:true,
        component:ArticleList,
        exact:true,
        type:"ordered-list"
    },
    {
        pathname:"/admin/article/edit/:id",
        component:ArticleEdit
    },
    {
        pathname:"/admin/settings",
        title:"设置",
        isNav:true,
        component:Settings,
        type:"setting"
    },
]