import React from 'react';
import { Table, Card, Button, Select, Row, Col, Form, Modal, Input, Radio } from 'antd';
import './index.css';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    className: 'td-padding-none'
}, {
    title: '用户名',
    dataIndex: 'user_name',
    className: 'td-padding-none'
}, {
    title: '手机',
    dataIndex: 'phone',
    className: 'td-padding-none'
}, {
    title: '邮箱',
    dataIndex: 'email',
    className: 'td-padding-none'
}, {
    title: '性别',
    dataIndex: 'user_sex',
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
        email: '387438473847@qq.com',
        user_sex: '男',
        creat_time: i,
        review_status: `Edward King ${i}`,
        operation: 32,
    });
}
export default class WebUserManage extends React.Component {
    state = {
        isAddVisible: false,
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
    // 新增用户
    addModel = () => {
        console.log('新增用户');
        this.setState({
            isAddVisible: true
        })
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
            <div>
                <Card>
                    <Row>
                        <Col span={4}>
                            <Button type="primary"
                                style={{ margin: '0 10px' }}
                                onClick={this.handleRole}>删除</Button>
                            <Button type="primary"
                                style={{ margin: '0 10px' }}
                                onClick={this.addModel}
                            >添加</Button>
                        </Col>
                        <Col span={14}></Col>
                        <Col span={6}>
                            <span style={{ display: 'inline-block', margin: '0 15px' }}>用户名筛选</span>
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
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    bordered />
                <Modal
                    title="添加用户"
                    visible={this.state.isAddVisible}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isAddVisible: false
                        })
                    }}
                >
                    <EditForm wrappedComponentRef={(inst) => this.roleForm = inst} />
                </Modal>
            </div>
        );
    }
}

// 编辑和添加的弹窗
class EditForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                            initialValue: '',
                            rules: [{ required: true, message: '请输入用户名!' }]
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="手机" {...formItemLayout}>
                    {
                        getFieldDecorator('phone', {
                            initialValue: ''
                        })(
                            <Input type="number" placeholder="请输入手机号" />
                        )}
                </FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                    {
                        getFieldDecorator('email', {
                            initialValue: ''
                        })(
                            <Input type="text" placeholder="请输入邮箱" />
                        )}
                </FormItem>
                <RadioGroup>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                </RadioGroup>
            </Form>
        );
    }
}
EditForm = Form.create({})(EditForm);