import React from "react"
import {render} from "react-dom"
import App from "./App"
import {mainRoute} from  "./routes"
import 'antd/dist/antd.css';
import {Provider} from "react-redux"
import store from "./store"

import {HashRouter as Router , Route , Switch , Redirect} from "react-router-dom"

render(
    <Provider store={store}>
    <Router>
        <Switch>
            <Route path="/admin" render={(routerProps)=>{
                return <App {...routerProps}/>
            }}/>
            {
                mainRoute.map(res=>{
                    return <Route key={res.pathname} path={res.pathname} component={res.component}/>
                })
            }
            <Redirect to="/admin" from="/" exact/>
            <Redirect to="/404"/>
        </Switch>
    </Router>
</Provider>
,document.getElementById("root"))