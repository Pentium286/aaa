import { request } from 'umi'
export async function getMenuList(params) {
    return request('/api/aiwo-product-manual/znpxMenu/listPage', {
        method: 'GET',
        params
    }).then(res => {
        if(res.success){
            return res.data.records
        }
    });
}