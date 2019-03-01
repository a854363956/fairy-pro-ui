/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import TablePaging from '@/components/TablePaging/TablePaging';
import FormJson from '@/components/FormJson/FormJson';
import UserModal from './modals/UserModal'

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
    this.handleModalInit = this.handleModalInit.bind(this);
    this.handleTableInit = this.handleTableInit.bind(this);
  }

  handleModalInit(self){
    this.modalSelf = self;
  }
  handleTableInit(self){
    this.tableSelf = self;
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
    const self = this
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
          buttons={[(
            <Button
             type="primary"
             icon="user-add"
             onClick={()=>{
               self.modalSelf.show();
             }}
            >
             添加用户
            </Button>
          )]}
        />
        <TablePaging
          url="/api/user/findUserAll"
          edited
          rowKey={record => record.id}
          filters={filters}
          onInit={this.handleTableInit}
          onSave={(form, id,table)=>{
            debugger
            self.props.dispatch({
              type: 'baseMenuUserManage/updateUser',
              payload: {
                ...form,
                id
              },
            }).then((bool)=>{
              table.refresh();
            })
          }}
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
              editable: true,
              width: 250,
            },
            {
              title: '所属角色',
              dataIndex: 'roleName',
              editable: true,
              inputType:'roleSelect',
              width: 150,
            },
            {
              title: '邮箱地址',
              dataIndex: 'email',
              editable: true,
              width: 250,
            },
            {
              title: '会话/分',
              dataIndex: 'onlineTime',
              width: 100,
              inputType: 'number',
              editable: true,
            },
          ]}
        />
        <UserModal
          onInit={this.handleModalInit}
          onOk={()=>{
            self.tableSelf.refresh()
          }}
        />
      </Card>
    );
  }
}

export default UserManagePage;
