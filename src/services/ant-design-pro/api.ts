// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { message } from 'antd';
import qs from 'qs';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any; }) {
  return request<{ data: API.CurrentUser; }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any; }) {
  sessionStorage.removeItem('userInfo');
  return request<Record<string, any>>('/api/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

// 登录接口
export async function login(body: API.LoginParams, options?: { [key: string]: any; }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    data: qs.stringify(body),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    skipErrorHandler: true, // 跳过默认的错误处理
  });
}

// 员工权限详情
export async function getZnpxUserAuth(params) {
  return request('/api/aiwo-plat-employee/znpxUserAuth/listPage', {
    method: 'GET',
    params
  }).then(res => {
    return res.data.records.map(item => item.code);
  });
}

// 员工权限详情
export async function getGptCompanyInfo(params) { //assoCompanyId
  return request('/api/aiwo-plat-jeangpt/gpt/company/getInfo', {
    method: 'GET',
    params
  }).then(res => {
    return res;
  });
}


/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any; }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}


