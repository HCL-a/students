import React, { Component } from 'react'
import {Card,Form, Icon, Input, Button, Checkbox} from "antd"
import {connect} from "react-redux"
import {login} from "../../actions/user"
import {Redirect} from "react-router-dom"
import "./login.scss"
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.login(values)
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                console.log(this.props.isLogin),
              this.props.isLogin
              ?
              <Redirect to="/admin"/>
              :
                 <Card title="学生管理后台" className="qf-from">
                        <Form onSubmit={this.handleSubmit} className="login-form ">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
  
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
    
        </Form.Item>
      </Form>
</Card>

        )
    }
}

const mapState = state=>({
  isLogin:state.user.isLogin
})

export default connect(mapState,{login})(Form.create()(Login))