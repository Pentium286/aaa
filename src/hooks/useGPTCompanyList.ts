import { useEffect, useState } from 'react';

import { request } from 'umi';

// 获取公司列表
export async function getCompanyList(type) {
  return request('/api/aiwo-plat-jeangpt/gpt/company/getPageList', {
    method: 'POST',
    data: {
      currPage: 1,
      pageSize: 9999,
      type: type || 0,
    },
  }).then((res) => {
    if (res && res.success && res.data && res.data.records) {
      const options = res.data?.records?.map((item) => {
        return {
          label: item.name,
          value: item.id,
          // key: item.assoCompanyId,
        };
      });
      return options;
    } else {
      return [];
    }
  });
}

// 项目下拉列表
const useCompanyList = (companyId, type) => {
  const [list, setList] = useState([]);
  const getCompany = async () => {
    try {
      const res = await getCompanyList(type);
      if (res) {
        const options = companyId > 0 ? res.filter((data) => data.value === companyId) : res || [];
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
