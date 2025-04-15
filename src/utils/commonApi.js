import { request } from 'umi';

// 关联品项
export async function conditionList(params) {
  return request('/api/aiwo-product-manual/item/associate', {
    method: 'GET',
    params,
  });
}

// 获取上传oss的token
export async function getUploadToken() {
  return request('/api/aiwo-plat-oss/sts/getStsToken', {
    method: 'POST',
  });
}

// 获取标签分类列表
export async function getCateList (params) {
    return request('/api/aiwo-plat-label/label/record/getCategoryList', {
        method: 'GET',
        params,
        skipErrorHandler: true, // 跳过默认的错误处理
    });
}

// 获取标签列表
export async function getLabelByCate (params) {
    return request('/api/aiwo-plat-label/label/record/getTagList', {
        method: 'GET',
        params
    });
}