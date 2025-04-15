import { request } from 'umi'
// 获取标签列表
export async function getLabelList(params) {
    return request('/api/aiwo-product-manual/znpxMenu/listPage', {
        method: 'GET',
        params
    }).then(res => {
        if(res.success){
            return res.data.records
        }
    });
}