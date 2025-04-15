import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    icon={<img style={{ width: 298 }} src='https://ruocha.oss-cn-shanghai.aliyuncs.com/healthdata/pic/scrm_03.png' />}
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
  />
);

export default NoFoundPage;