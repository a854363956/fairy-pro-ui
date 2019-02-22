/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import TablePaging from '@/components/TablePaging/TablePaging';
import FormJson from '@/components/FormJson/FormJson';

@connect(({ baseMenuUserManage }) => ({
  baseMenuUserManage,
}))
class UserManagePage extends Component {
  state = {
    filters: [],
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(error, values) {
    const filters = [];
    Object.keys(values).forEach(key => {
      filters.push({
        name: key,
        value: values[key],
        symbol: '=',
      });
    });

    this.setState({
      filters,
    });
  }

  render() {
    const { filters } = this.state;
    return (
      <Card>
        <FormJson
          items={[
            {
              name: 'loginName',
              placeholder: '登入名称',
              rules: [],
            },
            {
              name: 'realName',
              placeholder: '真实名称',
              rules: [],
            },
            {
              placeholder: '邮箱地址',
              name: 'email',
            },
          ]}
          handleSubmit={this.handleSubmit}
        >
          <Button />
        </FormJson>
        <TablePaging
          url="/api/user/findUserAll"
          edited
          rowKey={record => record.id}
          onSave={(form, id) => {
            form.validateFields((error, values) => {
              console.log(values);
              console.log(id);
            });
          }}
          filters={filters}
          columns={[
            {
              title: '登入名称',
              dataIndex: 'loginName',
              editable: false,
              width: 120,
            },
            {
              title: '真实名称',
              dataIndex: 'realName',
              editable: true,
              width: 150,
            },
            {
              title: '身份证',
              dataIndex: 'identityCard',
              editable: false,
              width: 250,
            },
            {
              title: '所属角色',
              dataIndex: 'roleName',
              editable: false,
              width: 150,
            },
            {
              title: '邮箱地址',
              dataIndex: 'email',
              editable: false,
              width: 250,
            },
            {
              title: '会话/分',
              dataIndex: 'onlineTime',
              width: 100,
              editable: false,
            },
          ]}
        />
      </Card>
    );
  }
}

export default UserManagePage;
