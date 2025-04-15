/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * role 角色
 *
 * COUNSELOR-咨询师
 * WXOP-网销运营
 * ADMIN-管理员
 * HEALTHOP-大健康运营
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined; }) {
  const { authList, companyId, realName }: any = initialState.currentUser || [];
  // const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '') || {};
  // 超管账号
  // if (companyId === 0 && realName === "智能品项超管") {
  //   authList = [
  //     '8001',
  //     '8001001',
  //     '8001002',
  //     '8006',
  //     '8006001',
  //     '8006002',
  //     '8006003',
  //     '9',
  //     '9002',
  //     '9001',
  //     '9003',
  //     '9003003',
  //     '9003002',
  //     '9001',
  //     '11001',
  //     '11002',
  //     '12001',
  //     '12001001',
  //     '12002',
  //     '13',
  //     '13001',
  //     '13001001',
  //     '13001002',
  //     '13002',
  //     '13002001',
  //     '13002002',
  //     '13002003',
  //     '13002004',
  //     '13002005',
  //     '13002006',
  //     '13003',
  //     '13004',
  //     '13005',
  //     '13005001',
  //     '13005002',
  //     '13005003',
  //   ];
  // }

  return {
    2004: authList?.includes('2004'), //神奇仪器
    2005: authList?.includes('2005'), //气质空间
    6: authList?.includes('6'), //智能品项-咨询手册
    6001: authList?.includes('6001'), //首页配置
    6002: authList?.includes('6002'), //分类管理
    6003: authList?.includes('6003'), //品项管理
    6004: authList?.includes('6004'), //案例管理
    6005: authList?.includes('6005'), //活动管理
    7: authList?.includes('7'), //智能品项-平台运营
    7001: authList?.includes('7001'), //活动方案
    7001001: authList?.includes('7001001'), //活动方案配置
    7001002: authList?.includes('7001002'), //活动弹窗配置
    7002: authList?.includes('7002'), //推送配置
    7002001: authList?.includes('7002001'), //护理推送设置
    7002002: authList?.includes('7002002'), //护理推送任务
    7002003: authList?.includes('7002003'), //推送运营
    7002004: authList?.includes('7002004'), //活动推送
    7003: authList?.includes('7003'), //服务流程设置
    7003001: authList?.includes('7003001'), //问诊表单
    7003002: authList?.includes('7003002'), //门店二维码
    7004: authList?.includes('7004'), //检测数据统计
    7004001: authList?.includes('7004001'), //AI体质检测
    7004002: authList?.includes('7004002'), //AI舌诊检测
    7004003: authList?.includes('7004003'), //体脂检测
    7004004: authList?.includes('7004004'), //肌肤标准检测
    7004005: authList?.includes('7004005'), //青春值检测
    7004006: authList?.includes('7004006'), //小程序肌肤检测
    7004007: authList?.includes('7004007'), //气质美学检测
    7004008: authList?.includes('7004008'), //健康管理检测
    7005: authList?.includes('7005'), // 问卷配置
    7006: authList?.includes("7006"), // 品项关联
    8: authList?.includes('8'), //智能品项-智能检测
    8001: authList?.includes('8001'), //体质检测
    8001001: authList?.includes('8001001'), //体质情况分析
    8001002: authList?.includes('8001002'), //调理方案配置
    8001003: authList?.includes('8001003'), //报告展示配置
    8001004: authList?.includes('8001004'), //功效症状配置
    8001005: authList?.includes('8001005'), //品项推荐配置
    8002: authList?.includes('8002'), //肌肤标准检测
    8002001: authList?.includes('8002001'), //肌肤提升计划配置
    // 8002002: authList?.includes('8002002'), //题目配置
    // 8002003: authList?.includes('8002003'), //推荐话术配置

    8007: authList?.includes('8007'), //小程序肌肤标准检测
    8007001: authList?.includes('8007001'), //小程序肌肤提升计划配置
    8007002: authList?.includes('8007002'), //小程序题目配置
    8007003: authList?.includes('8007003'), //小程序推荐话术配置

    8008: authList?.includes('8008'), //气质医美检测
    8008001: authList?.includes('8008001'), //气质医美检测 知识图库
    8008002: authList?.includes('8008002'), //气质医美检测 皮肤知识库

    8003: authList?.includes('8003'), //肌肤深度检测
    8003001: authList?.includes('8003001'), //深度检测顾客列表
    8003002: authList?.includes('8003002'), //深度检测护理配置
    8004: authList?.includes('8004'), //其他检测
    8004001: authList?.includes('8004001'), //上传报告
    8005: authList?.includes('8003'), //健康管理检测
    8005001: authList?.includes('8003'), //健康管理检测 知识图库
    8009: authList?.includes('8009'), //健康管理检测
    8009001: authList?.includes('8009001'), //健康管理检测 知识图库
    8009002: authList?.includes('8009002'), //健康管理检测 专项检测设置
    8009003: authList?.includes('8009003'), //健康管理检测 关联指标
    8009004: authList?.includes('8009004'), //健康管理检测 分类管理
    9: authList?.includes('9'), //智能品项-设置
    9001: authList?.includes('9001'), //版本更新
    9002: authList?.includes('9002'), //公司管理
    9003: authList?.includes('9003'), //人员管理
    9003001: authList?.includes('9003001'), //员工管理
    9003002: authList?.includes('9003002'), //权限模板
    9003003: authList?.includes('9003003'), //平台人员管理 9003003
    10: authList?.includes('10'), // 养生中心
    10001: authList?.includes('10001'), //内容管理
    10002: authList?.includes('10002'), //用户自选项配置
    10003: authList?.includes('10003'), //十二时辰配置
    10004: authList?.includes('10004'), //养生活动配置
    10005: authList?.includes('10005'), //推荐版块配置
    10006: authList?.includes('10006'), //节气养生配置
    10007: authList?.includes('10007'), //养生锦囊配置
    10008: authList?.includes('10008'), //美肤顾问配置
    10009: authList?.includes('10009'), //养颜中心配置
    13: authList?.includes('13'), // 美业AI应用
    13001: authList?.includes('13001'), // 智能体配置
    13001001: authList?.includes('13001001'), // 会话基础配置
    13001002: authList?.includes('13001002'), // 智能体配置
    13001003: authList?.includes('13001003'), // AI助理定制配置
    // 13001004: authList?.includes('13001004'), // AI助理定制配置-配置关注项
    13002: authList?.includes('13002'), // 应用数据配置
    13002001: authList?.includes('13002001'), // 提示词配置
    13002002: authList?.includes('13002002'), // 提示词配置-分类管理
    13002003: authList?.includes('13002003'), // 演练场景配置
    13002004: authList?.includes('13002004'), // 考卷管理
    13002005: authList?.includes('13002005'), // 题库管理
    13002006: authList?.includes('13002006'), // 答案玩法配置
    13003: authList?.includes('13003'), // 活动配置
    // 13003001: authList?.includes('13003001'), // 演练场景配置-预设角色
    13004: authList?.includes('13004'), // 知识库管理

    13005: authList?.includes('13005'), // 企业管理
    13005001: authList?.includes('13005001'), // 企业管理
    13005002: authList?.includes('13005002'), // 员工信息
    13005003: authList?.includes('13005003'), // 企业应用配置
    13005004: authList?.includes('13005004'), // 话术打卡
    13005005: authList?.includes('13005005'), // 考卷答题统计

    13006: authList?.includes('13006'), // 公版话术打卡
    13006001: authList?.includes('13006001'), // 美业话术集
    13006002: authList?.includes('13006002'), // 话术打卡设置
    13006004: authList?.includes('13006004'), // 话术数据统计
    13006005: authList?.includes('13006005'), // 等级封号设置

    11: authList?.includes('11'), // 养生机器人管理
    11001: authList?.includes('11001'), // 服务管理
    11002: authList?.includes('11002'), // 项目管理
    12: authList?.includes('12'), // IOT服务
    12001: authList?.includes('12001'), // 设备管理
    12001001: authList?.includes('12001001'), // 养生机器人设备
    12001002: authList?.includes('12001002'), // 肌肤检测设备设备
    12002: authList?.includes('12002'), // 供应商管理
    8006: authList?.includes('8006'), // 青春值检测
    8006001: authList?.includes('8006001'), // 青春值检测 - 问卷配置
    8006002: authList?.includes('8006002'), // 青春值检测 - 报告配置
    8006003: authList?.includes('8006003'), // 青春值检测 - 推荐文案配置
    12003: authList?.includes("12003"), // 版本管理
    12003001: authList?.includes("12003001"), // 机器人版本管理
    12001003: authList?.includes('12001003'), // 健康管理检测设备


  };
}
