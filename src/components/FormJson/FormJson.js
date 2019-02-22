/* eslint-disable */
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { isFunction } from 'util';

/**
 * 分页表格传入一个URL字符串即可
 */

class FormJson extends Component {
  state = {};

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormComponent = this.renderFormComponent.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const self = this;
    const { handleSubmit } = this.props;
    self.props.form.validateFields((error, values) => {
      if (isFunction(handleSubmit)) {
        handleSubmit(error, values);
      }
    });
  }

  renderFormComponent() {
    const { items, form, buttons } = this.props;
    const proxyButtons = [];
    const { getFieldDecorator } = form;
    const formItemsComponent = [];
    items.forEach(item => {
      formItemsComponent.push(
        <Form.Item key={`${item.name}`}>
          {getFieldDecorator(item.name, {
            rules: item.rules,
          })(<Input addonBefore={item.placeholder} placeholder={`请输入${item.placeholder}`} />)}
        </Form.Item>
      );
    });
    buttons.forEach(item => {
      proxyButtons.push(<Form.Item>{item}</Form.Item>);
    });

    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{ paddingBottom: '20px' }}>
        {formItemsComponent}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        {buttons}
      </Form>
    );
  }

  render() {
    return <div>{this.renderFormComponent()}</div>;
  }
}
const WrappedFormJson = Form.create({ name: 'form_json' })(FormJson);
export default WrappedFormJson;
