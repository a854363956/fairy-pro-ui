/* eslint-disable */

import React, { Component } from 'react';
import { Table, Pagination, Popconfirm } from 'antd';
import request from '@/utils/request';
// eslint-disable-next-line import/named
import { EditableCell, EditableContext, EditableFormRow } from './EditableCell';

/**
 * 分页表格传入一个URL字符串即可
 */
class TablePaging extends Component {
  state = {
    data: [],
    loading: false,
    paging: {
      total: 0,
      pageNo: 1,
      pageSize: 50,
      filters: [],
    },
    editingKey: '',
  };

  constructor() {
    super();
    this.onChangePagination = this.onChangePagination.bind(this);
  }

  componentDidMount() {
    this.refresh();
    const { onInit } = this.props
    if(onInit){
      onInit(this)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { paging } = this.state;
    this.requestData({
      pageSize: paging.pageSize,
      pageNo: paging.pageNo,
      sorts: nextProps.sort || {},
      filters: nextProps.filters || [],
    });
  }

  onChangePagination(page, pageSize) {
    this.requestData({
      pageSize,
      pageNo: page,
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  refresh() {
    const { paging } = this.state;
    const { sorts, filters } = this.props;
    this.requestData({
      pageSize: paging.pageSize,
      pageNo: paging.pageNo,
      sorts,
      filters,
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  isEditing(record) {
    const { editingKey } = this.state;
    return record.id === editingKey;
  }

  requestData({ pageSize, pageNo, sorts, filters }) {
    const { url } = this.props;
    const self = this;
    self.setState({
      loading: true,
    });
    request(url, {
      method: 'POST',
      data: {
        data: {
          pageSize,
          pageNo,
          sorts,
          filters,
        },
        token: localStorage.getItem('token'),
      },
    }).then(responseText => {
      const { data } = responseText;
      const { paging } = self.state;
      paging.total = parseInt(data.total);
      paging.pageNo = parseInt(pageNo);
      self.setState({
        data: data.data,
        loading: false,
        paging,
      });
    });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const self = this;
    const { edited, columns, onSave } = this.props;
    const { data, loading, paging } = this.state;
    const saveData = onSave || function() {};
    const proxyColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    if (edited) {
      proxyColumns.push({
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        // eslint-disable-next-line no-script-url
                        href="javascript:;"
                        onClick={() => {
                          form.validateFields((err, values) => {
                            saveData(values, record.id, self);
                            self.refresh();
                          });
                          self.cancel()
                        }}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="是否取消当前修改?"
                    onConfirm={() => {
                      this.cancel();
                    }}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.id)}>编辑</a>
              )}
            </div>
          );
        },
      });
    }
    return (
      <div>
        <Table
          components={components}
          columns={proxyColumns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={false}
          loading={loading}
          onChange={this.handleChangeTable}
          // bordered
          scroll={{ y: 440 }}
          rowClassName="editable-row"
        />
        <Pagination
          showSizeChanger
          defaultPageSize={paging.pageSize}
          pageSizeOptions={['50', '100', '200']}
          defaultCurrent={1}
          total={paging.total}
          onChange={this.onChangePagination}
          style={{ marginTop: '20px', float: 'right' }}
        />
      </div>
    );
  }
}
export default TablePaging;
