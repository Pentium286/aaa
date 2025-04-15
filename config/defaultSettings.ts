import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '数字化生产管理系统',
  pwa: false,
  // logo: 'https://aiwo-intellectual.oss-cn-hangzhou.aliyuncs.com/logo_project_icon.png',
  iconfontUrl: '//at.alicdn.com/t/c/font_3262936_m5isheuzjmk.js',
};

export default Settings;
