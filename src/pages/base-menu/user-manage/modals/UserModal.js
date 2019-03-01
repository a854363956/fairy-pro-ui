import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Input, Form, InputNumber } from 'antd';

@Form.create()
@connect(({ baseMenuUserManage }) => ({
    baseMenuUserManage,
}))
class UserModal extends Component{
    state={
        visible: false
    }

    constructor() {
        super();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
    handleCancel = () => {
        this.setState({
          visible: false,
        });
    }

    handleSubmit(){
        const { form } = this.props;
        const self = this;
        form.validateFields((err, values) => {
            
          if (!err) {

            Object.keys(values).forEach((key)=>{
                //  去除空格
                if(values[key].trim){
                    // eslint-disable-next-line no-param-reassign
                    values[key] = values[key].trim();
                }
            })
            self.props.dispatch({
                type: 'baseMenuUserManage/addUser',
                payload: {
                  ...values
                },
              }).then((bool)=>{
                  if(bool){
                      self.setState({
                          visible: false,
                      });
                      const { onOk } = self.props
                      if(onOk){
                        onOk()
                      }

                  }
              })
          }
        });
    }

    show(){
        this.setState({
            visible: true,
        });
    }

    render(){
        const { form, onInit } = this.props
        if(onInit){
            onInit(this)
        }
        const { visible } = this.state;
    
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
          };
        return (
          <Modal 
            visible={visible}
            width={400}
            title="请输入人员信息"
            onCancel={this.handleCancel}
            onOk={this.handleSubmit}
          >
            <Form>
              <Form.Item
                {...formItemLayout}
                label="登入名称"
              >
                {getFieldDecorator('loginName', {
                    rules:[{
                        required: true, 
                        message: '请输入登入名称...',
                    }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="真实名称"
              >
                {getFieldDecorator('realName', {
                    rules:[{
                        required: true, 
                        message: '请输入真实名称...',
                    }]
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="身份证"
              >
                {getFieldDecorator('identityCard', {
                    rules:[{
                        required: true, 
                        message: '请输入身份证号码...',
                    },{
                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: '请输入正确的身份证号码.'
                    }]
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="所属角色"
              >
                {getFieldDecorator('roleId', {
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="邮箱地址"
              >
                {getFieldDecorator('email', {
                    rules:[{
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/,
                        message: '邮箱格式不正确,例如admin@hotmail.com'
                    },{
                        required: true, 
                        message: '请输入邮箱地址...',
                    }]
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="会话/分"
              >
                {getFieldDecorator('onlineTime', {
                    rules:[{
                        required: true, 
                        message: '请输入在线时长...',
                    }]
                })(
                  <InputNumber size='100' style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
    }
}

export default UserModal;