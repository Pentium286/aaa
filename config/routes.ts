export default [
  {
    path: '/programManagement',
    name: 'programManagement',
    icon: 'AppleOutlined',
    routes: [
      {
        path: '/programManagement',
        redirect: '/programManagement/productionPlanningBoard',
      },
      {
        name: 'productionPlanningBoard',
        path: '/programManagement/productionPlanningBoard',
        component: './programManagement/productionPlanningBoard',
      },
      {
        name: 'planProgressComparison',
        path: '/programManagement/planProgressComparison',
        component: './programManagement/planProgressComparison',
      },
    ],
  },
  // 登录、404
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
      },
    ],
  },
  // 默认首页设置
  {
    path: '/',
    redirect: '/programManagement',
  },
  {
    component: '404',
  },
];
