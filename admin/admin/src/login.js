import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import './App.css';
import Admin from './admin.js';

class NormalLoginForm extends React.Component {
    state = {
        confirmDirty: false,
      };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.username ==='admin'||values.password==='123'){
            this.setState({confirmDirty:true});
            localStorage.setItem('confirmDirty','true');
        }
      }
    });
  };
  signOut = () =>{
    localStorage.removeItem('confirmDirty');
    window.location.reload();
  }
  render() {
    console.log(localStorage.getItem('confirmDirty')==='true');
    const { getFieldDecorator } = this.props.form;
    return (
<div>
{localStorage.getItem('confirmDirty')!=='true' ? (
<Form onSubmit={this.handleSubmit} className="login-form" style={{width:'19%',margin:'auto'}}>
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
          <a className="login-form-forgot" style={{justifyContent:'center',display:'flex'}}>
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'60%'}}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      ) : (
        <div>
            <Admin />
            <Button  className="login-form-button" style = {{position:'relative',left:'55px',top:'-60px'}} onClick={()=>this.signOut()}>
                Sign Out
            </Button>
        </div>
      )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;