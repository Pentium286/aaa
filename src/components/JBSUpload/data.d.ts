import type { UploadListType } from "antd";

export type JBSUploadProps = {
  handleCallback: function;
  successCallback?: function;
  sortIs?: boolean;
  maxCount: number;
  listType?: UploadListType | undefined;
  accept?: string;
  sourceData: any;
  uploadText?: string;
  maxSize?: number;
  disabled?: boolean;
  client?: tokenProps,
  videoType?: boolean;
  videoWidth?: string;
  videoHeight?: string;
  isPDF?: boolean;
  percentageFlag?: boolean; // 多个大文件上传，需要展示进度条，请启动
  defaultName?: boolean; // 是否使用默认文件名
  onPreviewFlag?: boolean; // 是否在线预览
};

export type DragableUploadListItemProps = {
  originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  file: UploadFile;
  fileList: UploadFile[];
  moveRow: (dragIndex: any, hoverIndex: any) => void;
  setDragFlagCallback: function;
};

export type tokenProps = {
  accessKeyId?: string,
  accessKeySecret?: string,
  expiration?: string,
  requestId?: string,
  securityToken?: string,
  put?: function,
  multipartUpload?: function,
};