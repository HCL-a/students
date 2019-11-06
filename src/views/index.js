// import ArticleList from "./Article"
// import ArticleEdit from "./Article/Edit"
// import Dashboard from "./Dashboard"
// import Settings from "./Settings"
// import Login from "./Login"
// import NotFound from "./NotFound"

import Loadable from "react-loadable"
import {Loading} from "../components"

const ArticleList = Loadable({
    loader:()=>import("./Article"),
    loading:Loading
})
const ArticleEdit = Loadable({
    loader:()=>import("./Article/Edit"),
    loading:Loading
})
const Dashboard = Loadable({
    loader:()=>import("./Dashboard"),
    loading:Loading
})
const Settings = Loadable({
    loader:()=>import("./Settings"),
    loading:Loading
})
const NotFound = Loadable({
    loader:()=>import("./NotFound"),
    loading:Loading
})
const Login = Loadable({
    loader:()=>import("./Login"),
    loading:Loading
})
export {
    ArticleEdit,
    ArticleList,
    Dashboard,
    Login,
    NotFound,
    Settings
}