import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef } from 'react';
import { message, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { FormInstance } from 'antd';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage } from 'umi';
import { login } from '@/services/ant-design-pro/api';
import styles from './index.less';
import './login.less';

const Login: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [username, setusername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const formRef = useRef<FormInstance>();
  const intl = useIntl();

  // 记住账号 checked
  useEffect(() => {
    if (!!localStorage.getItem('username')?.length) {
      setChecked(!!localStorage.getItem('username')?.length ? true : false);
    }
  }, []);

  // 记住账号 设置用户名
  useEffect(() => {
    if (!!localStorage.getItem('username')?.length) {
      setusername(localStorage.getItem('username') || '');
      formRef.current?.setFieldsValue({ userName: username });
    }
    if (!!localStorage.getItem('password')?.length) {
      setPassword(localStorage.getItem('password') || '');
      formRef.current?.setFieldsValue({ passWord: password });
    }
  }, [checked, username, password]);

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.success) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        // 此方法会跳转到 redirect 参数所在的位置
        history.push('/');

        // 账号存入 localStorage
        if (checked) {
          localStorage.setItem('username', values.userName ? values.userName : '0');
          localStorage.setItem('password', values.passWord || '');
        } else {
          localStorage.setItem('username', '');
          localStorage.setItem('password', '');
        }
        return;
      } else {
        message.error(msg.message);
      }
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginBg}>
          <LoginForm
            formRef={formRef}
            logo={<img alt="logo" src="/logo.svg" />}
            title="数字化生产管理系统"
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
            actions={
              <div className={styles.autoCheck}>
                <div className={styles.autoCheckLeft}>
                  <Checkbox checked={checked} onChange={onChange}>
                    记住账号
                  </Checkbox>
                </div>
              </div>
            }
          >
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
                onBlur: async (e) => {
                  formRef.current?.setFieldsValue({ companyId: null });
                  if (e.target.value == 'admincg') {
                    formRef.current?.setFieldsValue({ companyId: 0 });
                  } else {
                  }
                },
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '请输入用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="passWord"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '请输入密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>
    </div>
  );
};
export default Login;
