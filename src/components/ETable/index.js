import React from 'react'
import { Table } from 'antd'
import "./index.scss"
export default class ETable extends React.Component {

    state = { selectedKey: 0 }
    //处理行点击事件
    onRowClick = (record, index) => {
        this.setState({ selectedKey: index });
        this.props.updateSelectedItem([index], record, []);
        console.log(1, this.state.selectedKey);
    };

    // 选择框变更
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedKey: selectedRowKeys[0] });
        this.props.updateSelectedItem(selectedRowKeys, selectedRows[0], []);
        console.log(2, this.state.selectedKey);
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        console.log(3, selectedRows);
        let selectedIds = [];
        let selectKey = [];
        selectedRows.forEach((item, i) => {
            selectedIds.push(item.id);
            selectKey.push(i);
        });
        this.props.updateSelectedItem(selectKey, selectedRows[0] || {}, selectedIds);
    }

    getOptions = () => {
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect: (record, selected, selectedRows) => {

            },
            onSelectAll: this.onSelectAll
        };
        // index == this.state.selectedKey ? 'selected-row' : ''
        return <Table
            rowClassName={(record, index) => console.log(index)}
            className="card-wrap page-table"
            bordered
            {...this.props}
            rowSelection={rowSelection}
            onRow={(record, index) => ({
                onClick: () => {
                    this.onRowClick(record, index)
                }
            })}
        />
    };
    render = () => {
        return (
            <div>
                {this.getOptions()}
            </div>
        )
    }
}