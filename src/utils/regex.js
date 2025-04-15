export default {
  // 正数、负数、小数
  regExp_InputComNum: /^(\-|\+)?\d+(\.\d+)?$/,

  // 简易身份证
  regExp_ValidateIdcard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

  // 任务名称、备注
  // 允许输入汉字、字母、数字、下划线、斜杠
  regExp_Note: /^[a-zA-Z0-9_\\/\u4e00-\u9fa5]+$/,

  // 数据库地址
  // 允许输入汉字、数字、字母、下划线、斜杠、特殊符号
  regExp_Database: /^[a-zA-Z0-9_\\/\u4e00-\u9fa5`~!@#$%^&*()-_+=|{}':;',\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]+$/,

  // 用户名、密码、运行参数、hivejdbc用户名、hive密码
  // 允许输入字母、数字、特殊符号
  regExp_UserName: /^[A-Za-z0-9`~!@#$%^&*()-_+=|{}':;',\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]+$/,

  // 主机IP
  // 允许输入数字和点（英文状态）
  regExp_IP: /^[0-9\.]*$/,

  // SSH端口
  // 允许输入数字
  regExp_SSH: /^[0-9]+$/,

  // HDFS路径、数据源名称、数据源地址、输入路径、输出路径、主机名、UDF jar存放路径、Hive安装目录、HQL存放目录、spark安装目录、Spark Jar存放路径、Sqoop安装目录、Hadoop安装目录、MapReduce Jar存放路径、替换符路径
  // 允许输入汉字、字母、数字、特殊符号
  regExp_Path: /^[\u4e00-\u9fa5A-Za-z0-9`~!@#$%^&*()-_+=|{}':;',\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]+$/,

  // mainclass
  // 允许输入字母、数字、英文状态的点
  regExp_MainClass: /^[A-Za-z0-9\.]*$/,

  // 数据源标识符、英文标识
  // 允许输入英文
  regExp_DataSource: /^[A-Za-z]+$/,

  // 手机号
  regExp_PhoneNumber: /^[1][3,4,5,7,8,9][0-9]{9}$/,

  // 新能源车牌号(8位)
  regExp_NewEnergyLicensePlate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/,

  // 常规车牌号(7位)
  regExp_LicensePlate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/,

  // 必须带端口号的网址(或ip)
  regExp_HttpPort: /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/,

  // 网址(支持端口和"?+参数"和"#+参数)
  regExp_HttpPortParameter: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/,

  // 统一社会信用代码
  regExp_UnifyTheSocialCreditCode: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,

  // 迅雷链接
  regExp_Thunder: /^thunderx?:\/\/[a-zA-Z\d]+=$/,

  // ed2k链接(宽松匹配)
  regExp_Ed2k: /^ed2k:\/\/\|file\|.+\|\/$/,

  // 磁力链接(宽松匹配)
  regExp_Magnet: /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/,

  // linux"文件夹"路径
  regExp_LinuxFolder: /^\/(\w+\/?)+$/,

  // linux"文件"路径
  regExp_LinuxFile: /^\/(\w+\/)+\w+\.\w+$/,

  // window下"文件夹"路径
  regExp_Folder: /^[a-zA-Z]:\\(?:\w+\\?)*$/,

  // window下"文件"路径
  regExp_File: /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/,

  // md5格式(32位)
  regExp_MD5: /^([a-f\d]{32}|[A-F\d]{32})$/,

  // 视频链接地址（视频格式可按需增删）
  regExp_VideoHttp: /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i,

  // 图片链接地址（图片格式可按需增删）
  regExp_ImgHttp: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i,

  // base64格式
  regExp_Base64: /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i,

  // 数字/货币金额（支持负数、千分位分隔符）
  regExp_Money: /^-?\d+(,\d{3})*(\.\d{1,2})?$/,

  // 银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
  regExp_BankCardNumber: /^[1-9]\d{9,29}$/,

  // 中文姓名
  regExp_ChineseName: /^(?:[\u4e00-\u9fa5·]{2,16})$/,

  // 英文姓名
  regExp_EnglishName: /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/,

  // 信用代码校验
  regExp_ValidateCreditCode: /^[11|12|13|19|51|52|53|59|91|92|93|Y1]{2}\d{6}[0-9A-Z]{10}$/,

  // 汉字、数字、字母
  regExp_ValidateChEnNum: /^[\u4e00-\u9fa5A-Za-z0-9]+$/,

  // 1-100的整数
  regExp_ValidateOneTohundred: /^[1-9]\d*$/,

  // 接口地址
  regExp_ResourceUrl: /^[A-Za-z0-9`~!@#$%^&*()-_+=|{}':;'",\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]+$/,

  // 只能输入中文、下划线、大小写英文、数字
  regExp_Pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,

  // 首尾不能有空格
  regExp_NoBrace: /^\S.*\S$|(^\S{0,1}\S$)/,
};