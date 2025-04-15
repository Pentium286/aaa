import { request } from 'umi'
export async function getDepartment(params) {
    return request('/api/aiwo-plat-employee/manual/department/detail', {
        method: 'GET',
        params
    }).then(res => {
        if(res.success){
            return res.data
        }
    });
}
export async function getPermission(params) {
    return request('/api/aiwo-product-manual/permission/detail', {
        method: 'GET',
        params
    }).then(res => {
        if(res.success){
            return res.data.menuPermissions
        }
    });
}
export async function addPermission(data: { [key: string]: any }) {
    {
        return request('/api/aiwo-product-manual/permission/add',{
            method:'POST',
            data
        }).then(res=>{
            return res
        })
    }
}