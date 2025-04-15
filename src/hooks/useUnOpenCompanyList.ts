import { useEffect, useState } from 'react';

import { getUnOpenCompanyList } from '@/pages/iot/iot-device/components/healthLibrary/service';

// 项目下拉列表
const useUnOpenCompanyList = () => {
  const [list, setList] = useState([]);
  const getCompany = async () => {
    try {
      const res = await getUnOpenCompanyList();
      if (res && res.length) {
        setList(res);
      } else {
        setList([]);
      }
    } catch (err) {
      console.log(err, '公司列表获取失败');
    }
  };

  // 重新获取列表
  const refresh = () => {
    getCompany();
  };

  useEffect(() => {
    getCompany();
  }, []);

  return [list, refresh];
};

export default useUnOpenCompanyList;
