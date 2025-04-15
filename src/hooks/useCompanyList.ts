import { useEffect, useState } from 'react';

import { getCompanyList } from '@/pages/iot/iot-device/components/healthLibrary/service';

// 项目下拉列表
const useCompanyList = (companyId) => {
  const [list, setList] = useState([]);
  const getCompany = async () => {
    try {
      const res = await getCompanyList();
      if (res) {
        const options =
          companyId > 0
            ? res.filter((data) => data.value === companyId)
            : (res || []);
        setList(options);
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

export default useCompanyList;
