import { request } from 'umi';

export async function getProjectList(params: { [key: string]: any; }) {
  return request('/api/aiwo-product-manual/aiwo/health/item/asso/pageList', {
    method: 'GET',
    params: {
      currPage: params.current,
      ...params
    }
  }).then(res => {
    return {
      current: res.data.pages,
      pageSize: res.data.size,
      data: res.data.records,
      success: res.success,
      total: res.data.total,
    };
  });
}

export async function getTypeList() {
  return request('/api/aiwo-product-manual/push/config/listProjectType', {
    method: 'GET',
  }).then(res => {
    let options = [];
    options = res.data?.map((item) => {
      return {
        label: item.typeName,
        value: item.type,
      };
    });
    return options;
  });
}