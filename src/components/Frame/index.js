import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import {withRouter} from "react-router-dom"
import Logo from "./logo.png"
import "./index.scss"

const { Header, Content, Sider } = Layout;

class Frame extends Component {
  handleClick = ({ key })=>{
    this.props.history.push(key)
  }
  render() {
        let selectedKeysArr = this.props.location.pathname.split("/")
        selectedKeysArr.length = 3
        return (
            <Layout>
                <Header className="header qf-header">
                    <div className="logo" >
                        <img className="qf-logo" src={Logo} alt=""/>
                    </div>
                </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[selectedKeysArr.join("/")]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={this.handleClick}
                >
                    {
                      this.props.menu.map(item=>{
                        return (
                          <Menu.Item key={item.pathname}>
                            <Icon type={item.type}/>
                            {item.title}
                          </Menu.Item>
                        )
                      })
                    }
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px' }}>
                <Content
                  style={{
                    background: '#fff',
                    margin: 0,
                  }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}

export default withRouter(Frame)