import React, { useEffect, useState, } from 'react';
import { Avatar, Row, Col } from 'antd';
import { ProCard } from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { caseList } from './service';
import './index.less';
import Scheduler from "./parts/Scheduler";

const ConsolePage: React.FC = () => {

  return (
    <PageContainer >
      <Scheduler />
    </PageContainer>
  );
};

export default ConsolePage;