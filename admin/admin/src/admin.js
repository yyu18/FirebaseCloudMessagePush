import {
    Form,
    Input,
    Tooltip,
    Icon,
    Button,
    message
  } from 'antd';
  import React from 'react';
  import './App.css';
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "POST",  'https://nodejs.singtao.ca:8080/sendTopic'); // false for synchronous request
          xmlHttp.setRequestHeader("Content-Type", "application/json");
          xmlHttp.send(JSON.stringify({
            "topic":values.topic,
            "content" :{
              "title":values.title,
              "body":values.body,
              "image":values.image,
              "icon":values.icon,
              "url":values.url
            }
          }));
          xmlHttp.onreadystatechange= function() {
            if(this.readyState === 4 && this.status === 200){
              var res = JSON.parse(xmlHttp.response);
              if(res.status==="SUCCESS") {
                message.success(res.message);
              } else {
                message.error(res.message)
              }
            }
          }
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

      return (
         
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{width:"40%",margin:'auto'}}>
          <h1 style={{textAlign:'center'}}>Send Notification By Topic/Group</h1>
          <Form.Item label="Topic">
            {getFieldDecorator('topic', {
              rules: [
                {
                  required: true,
                  message: 'Please input the Topic!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Notification Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input the notification title!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Notification Body" hasFeedback>
            {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                  message: 'Please input the notification body!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Image">
            {getFieldDecorator('image', {
              rules: [
                {
                  required: true,
                  message: 'Please input the image!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label={
              <span>
                ICON&nbsp;
                <Tooltip title="The small image logo beside the notification.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('icon', {
              rules: [{ required: true, message: 'Please input the icon!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label={
              <span>
                URL Redirection&nbsp;
                <Tooltip title="Where to go when the user clicks the notification">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('url', {
              rules: [{ required: true, message: 'Please input the URL Redirection!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
  export default WrappedRegistrationForm;