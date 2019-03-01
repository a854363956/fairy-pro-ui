/* eslint-disable */
import React, { Component } from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

import requestApi from '../../services/requestApi'

export class CustomGroupSelect extends Component{
    state ={
        datas: []
    }
    constructor() {
        super();
        this.readerGroupSelect = this.readerGroupSelect.bind(this);
    }
    componentDidMount(){
        this.requestData()
    }

    requestData(){
        const { url, params} = this.props
        const self = this
        if(params){
            requestApi(url,params).then((data)=>{
                self.setState({
                    datas: data.data
                })
            })
        }else{
            requestApi(url,{}).then((data)=>{
                self.setState({
                    datas: data.data
                })
            })
        }
    }
    readerGroupSelect(){
        const self = this
        const optGroups = []
        for(let y=0;y< this.state.datas.length;y++){
            const element = this.state.datas[y]
            const options = []
            const { groupList } = element
    
            for(let i=0;i<groupList.length;i++){
                options.push((
                    <Option key={groupList[i].value} value={groupList[i].value}>{groupList[i].key}</Option>
                ))
            }
            optGroups.push((
                <OptGroup label={element.groupName} key={element.groupName}>
                    {options}
                </OptGroup>
            ))
        }


        return (
            <Select
                style={{ width: '100%' }}
                value={self.props.value}
                onChange={(value) => {
                    self.props.onChange(value);
                }}
              //  {...this.props}
            >
                {optGroups}
            </Select>
        )
       
    }
    render() {
        return <div>{this.readerGroupSelect()}</div>;
      }
}
