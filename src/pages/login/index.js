import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import './index.scss';
class NormalLoginForm extends React.Component {
    state = {
        verCode: 'http://172.12.225.241:8080/v1/captcha'
    };
    componentWillMount() {
    }
    // 获取验证码
    getLoginVerCode = () => {
        this.setState({
            verCode: `http://172.12.225.241:8080/v1/captcha?t=${new Date().getTime()}`
        })
    }
    handleSubmit = (e) => {
        // e.preventDefault();  this.props.history.push('/admin')
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`欢迎${userInfo.userName}进入`);
                this.props.history.push('/admin');
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id='normal-login'>
                <img src='/assets/logo.svg' className="top-logo" />
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户账号!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div style={{ width: '60%', display: 'inline-block' }}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入左边图片中的验证码!' }],
                            })(
                                <Input placeholder="请输入左边图片中的验证码" />
                            )}
                        </div>
                        <img src={this.state.verCode}
                            style={{ marginLeft: '5px', marginTop: '-8px', width: '37%', height: '40px' }}
                            onClick={this.getLoginVerCode} />
                    </Form.Item>
                    <Form.Item>
                        {/* {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox style={{ float: 'left' }}>自动登陆</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a> */}
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={this.handleSubmit}>
                            登陆
                        </Button>
                        {/* <a href="">立即注册!</a> */}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login