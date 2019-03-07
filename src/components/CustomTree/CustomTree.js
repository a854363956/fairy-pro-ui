/* eslint-disable */
import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

import requestApi from '../../services/requestApi';

export class CustomTree extends Component {
  state = {
    datas: [],
  };

  constructor() {
    super();
    this.readerTree = this.readerTree.bind(this);
  }

  componentDidMount() {}

  requestData() {
    const { url, params } = this.props;
    const self = this;
    if (params) {
      requestApi(url, params).then(data => {
        self.setState({
          datas: data.data,
        });
      });
    } else {
      requestApi(url, {}).then(data => {
        self.setState({
          datas: data.data,
        });
      });
    }
  }

  readerTreeNode(treeNode) {
    const resultNode = [];
    treeNode.forEach(node => {
      const child = readerTreeNode(node.childrens);
      resultNode.push(
        <TreeNode key={node.key} title={node.title}>
          {child}
        </TreeNode>
      );
    });
    return resultNode;
  }

  readerTree() {
    const treeNode = [];
    this.state.datas.forEach(data => {
      treeNode.push(
        <TreeNode key={data.key} title={data.title}>
          {this.readerTreeNode(data)}
        </TreeNode>
      );
    });
    return (
      <Tree
      // {...this.props}
      >
        {treeNode}
      </Tree>
    );
  }

  render() {
    return <div>{this.readerTree()}</div>;
  }
}
