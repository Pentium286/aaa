import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import '@/styles/global.less';
import moment from 'moment';

console.log("智能品项-环境变量: ", REACT_APP_ENV);

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
// 请求前拦截 requestInterceptors see https://pro.ant.design/docs/request/#pre-request-interception-requestinterceptors
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = options.headers || {
    'Content-Type':
      options.method == 'post' ? 'application/json' : 'application/x-www-form-urlencoded',
  };
  return {
    url,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
// 响应后拦截 responseInterceptors https://pro.ant.design/docs/request/#post-response-interceptors-responseinterceptors
const demoResponseInterceptors = (response: Response) => {
  const resJSON = response.json(); // body 需要转化一下 我们默认请是一个 json 所以对它做了 json的转化。https://github.com/ant-design/ant-design-pro/issues/935
  resJSON.then((res: any) => {
    if (response.status === 401 && res.code === '500') {
      history.push('/user/login');
    }
  });
  return resJSON;
};
export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        ...resData,
        errorMessage: resData.message, // 错误提示统一处理
      };
    },
  },
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: (msg: any) => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async (msg: any) => {
    try {
      sessionStorage.setItem('userInfo', JSON.stringify(msg)); // 存入session里，每次页面刷新时候都获取一次
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '0');
    // console.log('111xxx-userInfo', userInfo);
    const currentUser = await fetchUserInfo(userInfo);
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      fontColor: 'rgba(217,217,229,0.2)',
      fontSize: 14,
      gapX: 300,
      gapY: 300,
      zIndex: 0,
      content: [
        (initialState?.currentUser?.realName || initialState?.currentUser?.mobile || '') + (initialState?.currentUser?.companyName ? `(${initialState?.currentUser?.companyName})` : ""),
        moment().format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    onPageChange: () => {
      const { location } = history;
      // console.log("location", location);
    },
    links: isDev ? [] : [],
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
