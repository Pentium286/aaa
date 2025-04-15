import { createFromIconfontCN } from '@ant-design/icons';
import { Modal, Upload, message, Button } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OSS from "ali-oss";
import DragableUploadListItem from './parts/index';
import type { JBSUploadProps, tokenProps } from './data';
import { getUploadToken } from '@/utils/commonApi';
import { getImgFileFormUrl } from '@/utils/common';
import './index.less';
import scriptUrl from "../../../config/defaultSettings";

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const IconFont = createFromIconfontCN({
  scriptUrl: scriptUrl.iconfontUrl,
});

const baseImg = 'https://static.aiwobeauty.com/';

const JBSUpload: React.FC<JBSUploadProps> = ({ sourceData, handleCallback, successCallback, sortIs = false, maxCount, listType = "picture-card", accept = "", uploadText = "Upload", maxSize = 20, disabled = false, videoType = false, videoWidth = '800', videoHeight = '450', isPDF = false, percentageFlag = false, defaultName = false, onPreviewFlag = false }) => {
  const [fileListArr, setFileListArr] = useState<any[]>([]); // 添加附件 用于回显，需要转成对象显示数据
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [dragFlag, setDragFlag] = useState(false);
  const [tokenInfo, setToken] = useState<tokenProps>();
  let messageFlag = true;

  const [fileLength, setFileLength] = useState(0);
  const [fileObj, setFileObj] = useState({});
  const [uploadState, setUploadState] = useState(false);

  // 获取oss token
  const getToken = () => {
    getUploadToken().then(res => {
      if (res.success) {
        const client = new OSS({
          region: 'oss-cn-hangzhou',
          bucket: 'aiwo-platform',
          accessKeyId: res.data.accessKeyId,
          accessKeySecret: res.data.accessKeySecret,
          stsToken: res.data.securityToken,
          secure: true
        });
        setToken(client);
      }
    }).catch(() => {

    });
  };

  // 数据传入回显
  useEffect(() => {
    // console.log(sourceData, "sourceData");
    getToken();
    setFileListArr([...sourceData || []]);
  }, [sourceData]);

  // 根据视频截取视频第一帧作为封面图,url转为file
  const getVideoImg = async (url, fileName) => {
    try {
      const result = await getImgFileFormUrl(url, fileName);
      return result;
    } catch (error) {
    }
  };

  // 上传视频封面
  // @ts-ignore
  const uploadVideoImg = async (file: any, type: any) => {
    if (type) {
      try {
        const url = `${baseImg}${file.name}?x-oss-process=video/snapshot,t_6000,f_jpg,w_${videoWidth},h_${videoHeight},m_fast`;
        const result = await getVideoImg(url, `${parseInt((Math.random() * 100000).toString())}.jpeg`);
        const videoImgInfo = await tokenInfo?.put(`AIWO_INTELLECTUAL/image/${Date.now()}/${Date.now()}_${result?.name}`, result);

        if (videoImgInfo.url) {
          return `${baseImg}${videoImgInfo.name}`;
        }
      } catch (error) {
      }
    }
  };

  // 设置上传图片的进度
  const getLoadingList = (arr, file) => {
    const newA = arr.filter(item => file.uid == item.uid);
    if (newA.length == 0) {
      arr.push(file);
    } else {
      arr.map(item => {
        if (item.uid == file.uid) {
          item.percent = file.percent;
          item.status = file.percent == 100 ? 'success' : 'uploading';
          item.url = file.url;
          item.videoCoverImg = file.videoCoverImg || '';
        }
      });
    }
    return arr;
  };

  // 普通上传
  const commonUpload = async (options, type) => {
    if (!tokenInfo) {
      await getToken();
    }
    try {
      const arr = options.name.split('.');
      let fileName = "";
      let url = "";
      if (defaultName) {
        fileName = options.name;
        url = `AIWO_INTELLECTUAL/image/${Date.now()}/${fileName}`;
      } else {
        fileName = `${parseInt((Math.random() * 100000).toString())}.${arr[arr.length - 1]}`;
        url = `AIWO_INTELLECTUAL/image/${Date.now()}/${Date.now()}_${fileName}`;
      }
      tokenInfo?.put(url, options)
        .then(async res => {
          if (res.res.status === 200) {
            await successCallback && successCallback(true);
            let videoCover;
            if (type) {
              videoCover = await uploadVideoImg(res, type);
            }
            const result1 = {
              uid: options.uid,
              url: `${baseImg}${res.name}`,
              status: 'success',
              percent: 100,
              videoCoverImg: videoCover || '',
            };
            await getLoadingList(fileListArr, result1);
            setFileListArr([...fileListArr]);
            await handleCallback([...fileListArr]);
          }
        }).catch(async err => {
          message.error('上传失败,请重试');
          if (err.status == 403) {
            await getToken();
          }
          fileListArr.map((item, index) => {
            if (item.uid == options.uid) {
              fileListArr.splice(index, 1);
            }
          });
          setFileListArr([...fileListArr]);
          await handleCallback([...fileListArr]);
        });
    } catch (error) { }
  };

  useEffect(() => {
    if (percentageFlag) {
      const info = {
        ...fileObj,
        percent: fileLength,
      };
      getLoadingList(fileListArr, info);
    }
  }, [fileLength]);

  // 分片上传
  const multipartUpload = async (file, type) => {
    if (!tokenInfo) {
      await getToken();
    }
    let percent1 = 0;
    const arr = file.name.split('.');
    let fileName = "";
    if (defaultName) {
      fileName = file.name;
    } else {
      fileName = `${Date.now()}_${parseInt((Math.random() * 100000).toString())}.${arr[arr.length - 1]}`;
    }
    tokenInfo?.multipartUpload(fileName, file, {
      progress: (percentage) => {
        percent1 = percentage * 100;
        if (percentageFlag) {
          setFileLength(percent1); // 进度赋值
        }
      },
    }).then(async result => {
      if (result.res.status === 200) {
        let videoCover;
        await successCallback && successCallback(true);
        if (type) {
          videoCover = await uploadVideoImg(result, type);
        }
        const info = {
          uid: file.uid,
          url: `${baseImg}${result.name}`,
          status: percent1 == 100 ? 'success' : 'uploading',
          percent: percent1,
          videoCoverImg: videoCover
        };
        if (percentageFlag) {
          setUploadState(false);
        }
        await getLoadingList(fileListArr, info);
        setFileListArr([...fileListArr]);
        await handleCallback([...fileListArr]);
      }
    }).catch(async err => {
      // console.log(`failed === `, err);
      if (err.status == 403) {
        await getToken();
      }
      fileListArr.map((item, index) => {
        if (item.uid == file.uid) {
          fileListArr.splice(index, 1);
        }
      });
      setFileListArr([...fileListArr]);
      await handleCallback([...fileListArr]);
      message.error('上传出错,请重试');
    });
  };

  // 上传图片
  const uploadFiles = async (customObj) => {
    const { file } = customObj;
    if (!file.url) {
      await getLoadingList(fileListArr, file);
      // console.log(fileListArr)
      setFileListArr([...fileListArr]);
      await handleCallback([...fileListArr]);
      if (file.size < 10 * 1024 * 1024) {
        commonUpload(file, videoType);
      } else {
        multipartUpload(file, videoType);
      }
    }
  };

  // 删除
  const removeFiles = async (event) => {
    fileListArr.map((item, index) => {
      if (item.uid == event.uid) {
        fileListArr.splice(index, 1);
      }
    });
    setFileListArr([...fileListArr]);
    await handleCallback([...fileListArr]);
  };

  // 拖拽监听
  useEffect(() => {
    if (dragFlag) {
      handleCallback([...fileListArr]); // 拖拽完成把图片传给父组件
    }
    setDragFlag(false);
  }, [fileListArr, dragFlag, handleCallback]);

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragRow = fileListArr[dragIndex];
    setFileListArr(
      update(fileListArr, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      }),
    );
  }, [fileListArr]);

  const uploadProps: UploadProps = {
    name: "file",
    accept: accept,
    listType: listType,
    multiple: maxCount > 1 ? true : false,
    maxCount: maxCount,
    disabled: disabled || percentageFlag ? uploadState : false,
    fileList: fileListArr,
    customRequest: uploadFiles,
    // onChange:uploadFiles,
    beforeUpload(file: RcFile, fileList) {
      // console.log('uploadProps: ', fileList);
      if (percentageFlag) {
        setUploadState(true);
        setFileObj(fileList[0]); // 文件复制
      }
      const isLt2M = file.size / 1024 / 1024 < maxSize;
      const isMax = (maxCount >= fileListArr.length + fileList.length);
      const arr = file.name.split('.');
      const fileNameType = arr[arr.length - 1];
      const isAccept = accept.indexOf(fileNameType) > -1;
      if (!isMax && messageFlag) {
        message.error(`上传文件不能超过${maxCount}张`);
        messageFlag = false;
      }
      if (isMax) {
        messageFlag = true;
      }
      if (!isAccept) {
        message.error(`上传文件类型只能是${accept}`);
      }
      if (!isLt2M) {
        message.error(`上传文件不能大于${maxSize}MB!`);
      }
      if (isMax && isAccept && isLt2M) {
        successCallback && successCallback(false);
      }

      return isMax && isAccept && isLt2M;
    },
    async onPreview(file: UploadFile) {
      if (onPreviewFlag) {
        if (file.url && (file.url.indexOf('.xls') > -1 || file.url.indexOf('.xlsx') > -1 || file.url.indexOf('.doc') > -1 || file.url.indexOf('.docx') > -1 || file.url.indexOf('.ppt') > -1 || file.url.indexOf('.pptx') > -1)) {
          window.open(`https://view.officeapps.live.com/op/embed.aspx?src=${file.url}`);
        } else {
          window.open(file.url);
        }
      } else {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as RcFile);
        }
        if (isPDF) {
          window.open(file.url);
        } else {
          setPreviewImage(file.url || (file.preview as string));
          setPreviewOpen(true);
          setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
        }
      }
    },
    // 排序
    itemRender(originNode, file, currFileList) {
      if (sortIs) {
        return <DragableUploadListItem
          originNode={originNode}
          file={file}
          fileList={currFileList}
          moveRow={moveRow}
          setDragFlagCallback={(flag: boolean) => setDragFlag(flag)}
        />;
      } else {
        return <>{originNode}</>; // 默认值
      }
    },
    onRemove: removeFiles,
    showUploadList: {
      showRemoveIcon: disabled ? false : true,
    },
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div>
      <IconFont className='iconJia' type="icon-jia" />
      <div style={{ marginTop: 8, color: "#595965" }}>{uploadText}</div>
    </div>
  );

  const uploadBox = (
    listType === "text" ? (
      <Button icon={<IconFont className='iconWenjianshangchuan' type="icon-wenjianshangchuan" />}>上传文件</Button>
    ) : (
      fileListArr.length >= maxCount ? null : uploadButton
    )
  );

  const handleFileName = (url: string) => {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    return filename;
  };

  return (
    <div className='jbsUpload'>
      <DndProvider backend={HTML5Backend}>
        <Upload {...uploadProps}>
          {
            disabled ? uploadState : false ? null : uploadBox
          }
        </Upload>
        <Modal open={previewOpen} title={handleFileName(previewTitle)} footer={null} onCancel={handleCancel}>
          {
            videoType ? (
              <video controls src={previewImage} style={{ width: '100%' }} />
            ) : (
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            )
          }
        </Modal>
      </DndProvider>
    </div>
  );
};

export default JBSUpload;
