import { Form, Input, Checkbox, Link, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';
import styles from './style/index.module.less';
import history from '../../history';
import { adminLogin } from '../../api/login';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  function afterLoginSuccess(params) {
    // // 记住密码
    // if (rememberPassword) {
    //   localStorage.setItem('loginParams', JSON.stringify(params));
    // } else {
    //   localStorage.removeItem('loginParams');
    // }
    // 记录登录状态
    localStorage.setItem('token', params.token);
    // 跳转首页
    window.location.href = history.createHref({
      pathname: '/',
    });
  }
  //use own axios api with token saving locally.
  async function login(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res: any = await adminLogin(params);
      console.log(res);
      if (res.data) {
        afterLoginSuccess(res.data);
      } else {
        setErrorMessage(res.msg || 'Something Wrong, try again');
      }

    } catch (error) {

    } finally {
      setLoading(false);
    }

    // axios
    //   .post('/api/v1/user/login', params)
    //   .then((res) => {
    //     const { status, msg } = res.data;
    //     if (status === 'ok') {
    //       afterLoginSuccess(params);
    //     } else {
    //       setErrorMessage(msg || 'Something Wrong, try again');
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  // 读取 localStorage，设置初始值
  // useEffect(() => {
  //   const params = localStorage.getItem('loginParams');
  //   const rememberPassword = !!params;
  //   setRememberPassword(rememberPassword);
  //   if (formRef.current && rememberPassword) {
  //     const parseParams = JSON.parse(params);
  //     formRef.current.setFieldsValue(parseParams);
  //   }
  // }, []);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>Login</div>
      <div className={styles['login-form-sub-title']}>Blog Admin System</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item field="userName" rules={[{ required: true, message: 'Username can not be empty' }]}>
          <Input prefix={<IconUser />} placeholder="Username：admin" onPressEnter={onSubmitClick} />
        </Form.Item>
        <Form.Item field="password" rules={[{ required: true, message: 'Please input your password' }, {
          match: /^[A-Za-z0-9]{6,20}$/, message: 'Password must contain 6-20 characters'
        }]}>
          <Input.Password
            prefix={<IconLock />}
            placeholder="Password：123456"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              Remember me
            </Checkbox>
            <Link>Forget your password？</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            Sign in
          </Button>
          {/* <Button type="text" long className={styles['login-form-register-btn']}>
            Register
          </Button> */}
        </Space>
      </Form>
    </div>
  );
}
