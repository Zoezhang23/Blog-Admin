import Mock from 'mockjs';
import setupMock from '../utils/setupMock';

setupMock({
  setup() {
    Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/userInfo'), () => {
      return {
        name: '王立群',
        avatar:
          'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        email: 'wangliqun@email.com',
        job: 'frontend',
        jobName: '前端开发工程师',
        organization: 'Frontend',
        organizationName: '前端',
        location: 'beijing',
        locationName: '北京',
        introduction: '王力群并非是一个真实存在的人。',
        personalWebsite: 'https://www.arco.design',
      };
    });

    // 登录
    Mock.mock(new RegExp('/api/v1/user/login'), (params) => {
      const { userName, password } = JSON.parse(params.body);
      if (!userName) {
        return {
          code: 404,
          data: null,
          status: 'error',
          msg: 'Username can not be empty',
        };
      }
      if (!password) {
        return {
          code: 404,
          data: null,
          status: 'error',
          msg: 'Password can not be empty',
        };
      }
      if (userName === 'admin' && password === '123456') {
        return {
          code: 500,
          data: {
            token: 'fake',
            userName: 'admin',
          },
          status: 'ok',
          msg: 'Login Sucessfully'
        };
      }
      return {
        code: 0,
        data: null,
        status: 'error',
        msg: 'Incorerect username or password!',
      };
    });
  },
});
