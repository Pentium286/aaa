type ResType<T> = {
  message: string;
  data: T;
  success: boolean;
  code: string;
  reason: ReasonMessage;
};

type ResListData<T> = {
  current: number;
  records: [T];
  size: number;
  total: number;
};

type ReasonMessage = {
  errMsg: string;
  exFrom: string;
};

export type { ResType, ReasonMessage, ResListData };