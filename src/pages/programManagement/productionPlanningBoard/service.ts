import { request } from 'umi';
// 列表
export async function caseList() {
  return request('/api/aiwo-product-manual/cases/getClassifyCase', {
    method: 'GET',
  }).then(res => {
    // 数据处理
    return {
      data: res.data,
      success: res.success,
    };
  }).catch(err => {
    console.log(err);
  });
}