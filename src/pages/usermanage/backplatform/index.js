import React from 'react';
import { Table, Card, Button, Select, Row, Col, Label } from 'antd';
import './index.css';
const Option = Select.Option;
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    className: 'td-padding-none'
}, {
    title: '登录名',
    dataIndex: 'user_name',
    className: 'td-padding-none'
}, {
    title: '手机',
    dataIndex: 'phone',
    className: 'td-padding-none'
}, {
    title: '角色',
    dataIndex: 'role',
    className: 'td-padding-none'
}, {
    title: '加入时间',
    dataIndex: 'creat_time',
    className: 'td-padding-none'
}, {
    title: '审核状态',
    dataIndex: 'review_status',
    className: 'td-padding-none'
}, {
    title: '操作',
    dataIndex: 'operation',
    className: 'td-padding-none',
    width: 200,
    render: (rende, index) => (
        <div>
            <Button type="primary" icon="edit" size='small' style={{ margin: '0 8px' }}>编辑</Button>
            <Button type="danger" icon="delete" size='small' style={{ margin: '0 8px' }}>删除</Button>
        </div>

    )
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        id: i,
        user_name: `Edward King ${i}`,
        phone: 32,
        role: `管理员 ${i}`,
        creat_time: i,
        review_status: `Edward King ${i}`,
        operation: 32,
    });
}
export default class BackPlatform extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    handleBlur = () => {
        console.log('blur');
    }

    handleFocus = () => {
        console.log('focus');
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: '全部选中',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: '选中奇数行',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: '选中偶数行',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Card>
                    <Row>
                        <Col span={4}>
                            <Button type="primary"
                                style={{ margin: '0 10px' }}
                                onClick={this.handleRole}>删除</Button>
                            <Button type="primary"
                                style={{ margin: '0 10px' }}
                                onClick={this.handlePermission}>添加</Button>
                        </Col>
                        <Col span={14}></Col>
                        <Col span={6}>
                            <span style={{ display: 'inline-block', margin: '0 15px' }}>登陆名筛选</span>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered />
            </div>
        );
    }
}