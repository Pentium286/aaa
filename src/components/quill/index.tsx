import React, {useRef, useState, useEffect, useMemo} from 'react';
import {Modal, Tabs, Input, Space, Button} from 'antd';
import ProTable from '@ant-design/pro-table';
import type {ActionType} from '@ant-design/pro-table';
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Video} from './Embed';
import JBSUpload from '../JBSUpload';
import styles from './index.less';
import _ from "lodash";

Quill.register({'formats/video': Video}, true);

export type ReactQuillCustomProps = {
  detail?: string,
  isFlagFromCopy?: boolean,
  isRead?: boolean,
  onQuillChange: (data?: any) => void;
};

const ReactQuillCustom: React.FC<ReactQuillCustomProps> = (props) => {
  const {
    detail,
    isFlagFromCopy,
    isRead,
    ...restProps
  } = props;

  const [uploadImgVisible, setUploadImgVisible] = useState(false)
  const [isImg, setIsImg] = useState(true)
  const [pictureFile, setPictureFile] = useState<any[]>([])
  const [linkVisible, setLinkVisible] = useState(false)
  const [link, setLink] = useState<any>()
  const [cursorPosition, setCursorPosition] = useState(0)

  let reactQuillRef: any = null

  const imageHandler = () => {
    let quill = reactQuillRef.getEditor();//获取到编辑器本身
    if (isImg && !_.isEmpty(pictureFile)) {

      for (let i = pictureFile.length - 1; i > -1; i--) {
        quill.insertEmbed(cursorPosition, "image", pictureFile[i].url);//插入图片
      }
    } else {
      quill.insertEmbed(cursorPosition, "video", pictureFile[0].url);//插入视频
    }
    quill.setSelection(cursorPosition + 1);//光标位置加1
    setCursorPosition(cursorPosition + 1)
    setUploadImgVisible(false)
  }

  const linkHandler = () => {
    let quill = reactQuillRef.getEditor();//获取到编辑器本身
    if (link) {
      quill.format('link', link);
    } else {
      quill.format('link', false);
    }
    setLinkVisible(false)
  }

  let toolbar = useMemo(() => ({
    toolbar: {
      container: [
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'font': []}],
        [{'size': []}],
        ['bold'],
        ['italic'],
        [{
          'background': [
            'rgba(0, 0, 0, 1)', 'rgba(255, 212, 69, 1)', 'rgba(243, 51, 52, 1)', 'rgba(255, 98, 211, 1)', 'rgba(106, 69, 255, 1)', 'rgba(68, 127, 255, 1)', 'rgba(89, 224, 173, 1)',
            'rgba(255, 255, 255, 1)', 'rgba(255, 238, 184, 1)', 'rgba(255, 204, 205, 1)', 'rgba(255, 206, 241, 1)', 'rgba(212, 201, 255, 1)', 'rgba(208, 223, 255, 1)', 'rgba(195, 247, 227, 1)',
            'rgba(187, 187, 187, 1)', 'rgba(127, 194, 112, 1)', 'rgba(241, 149, 51, 1)', 'rgba(255, 117, 152, 1)', 'rgba(143, 100, 236, 1)', 'rgba(107, 216, 238, 1)', 'rgba(40, 144, 153, 1)',
            'rgba(136, 136, 136, 1)', 'rgba(215, 246, 208, 1)', 'rgba(249, 214, 176, 1)', 'rgba(254, 215, 225, 1)', 'rgba(214, 200, 246, 1)', 'rgba(198, 238, 255, 1)', 'rgba(178, 211, 216, 1)',
            'rgba(68, 68, 68, 1)', 'rgba(162, 121, 8, 1)', 'rgba(168, 4, 5, 1)', 'rgba(167, 3, 121, 1)', 'rgba(53, 6, 154, 1)', 'rgba(3, 51, 157, 1)', 'rgba(16, 105, 71, 1)'
          ]
        }],
        [{
          'color': [
            'rgba(0, 0, 0, 1)', 'rgba(255, 212, 69, 1)', 'rgba(243, 51, 52, 1)', 'rgba(255, 98, 211, 1)', 'rgba(106, 69, 255, 1)', 'rgba(68, 127, 255, 1)', 'rgba(89, 224, 173, 1)',
            'rgba(255, 255, 255, 1)', 'rgba(255, 238, 184, 1)', 'rgba(255, 204, 205, 1)', 'rgba(255, 206, 241, 1)', 'rgba(212, 201, 255, 1)', 'rgba(208, 223, 255, 1)', 'rgba(195, 247, 227, 1)',
            'rgba(187, 187, 187, 1)', 'rgba(127, 194, 112, 1)', 'rgba(241, 149, 51, 1)', 'rgba(255, 117, 152, 1)', 'rgba(143, 100, 236, 1)', 'rgba(107, 216, 238, 1)', 'rgba(40, 144, 153, 1)',
            'rgba(136, 136, 136, 1)', 'rgba(215, 246, 208, 1)', 'rgba(249, 214, 176, 1)', 'rgba(254, 215, 225, 1)', 'rgba(214, 200, 246, 1)', 'rgba(198, 238, 255, 1)', 'rgba(178, 211, 216, 1)',
            'rgba(68, 68, 68, 1)', 'rgba(162, 121, 8, 1)', 'rgba(168, 4, 5, 1)', 'rgba(167, 3, 121, 1)', 'rgba(53, 6, 154, 1)', 'rgba(3, 51, 157, 1)', 'rgba(16, 105, 71, 1)'
          ]
        }],
        ['underline'],
        [{'align': []}],
        ['strike'],
        ['blockquote'],
        [{'indent': '-1'}],
        [{'indent': '+1'}],
        ['link'],
        ['image'],
        ['video'],
        ['clean']
      ],
      handlers: {
        'image': () => {
          const quill = reactQuillRef.getEditor();//获取到编辑器本身
          const cursorPosition = quill.getSelection().index;//获取当前光标位置
          setCursorPosition(cursorPosition)
          setPictureFile([])
          setIsImg(true)
          setUploadImgVisible(true)
        },
        'video': () => {
          const quill = reactQuillRef.getEditor();//获取到编辑器本身
          const cursorPosition = quill.getSelection().index;//获取当前光标位置
          setCursorPosition(cursorPosition)
          setPictureFile([])
          setIsImg(false)
          setUploadImgVisible(true)
        },
        'link': () => {
          setLink('')
          setLinkVisible(true)
        }
      }
    }
  }), [])

  return (
    <div className={styles.ReactQuillCustom}>
      <ReactQuill
        ref={ref => {
          if (ref) {
            reactQuillRef = ref
          }
        }}
        className={styles.ReactQuill}
        theme="snow"
        value={detail}
        readOnly={isRead}
        modules={toolbar}
        onChange={restProps.onQuillChange}
      />
      <Modal
        title={`上传${isImg ? '图片' : '视频'}`}
        visible={uploadImgVisible}
        maskClosable={false}
        width={550}
        className={styles.quillUploadModal}
        onOk={imageHandler}
        onCancel={() => setUploadImgVisible(false)}
      >
        <JBSUpload
          uploadText={`上传${isImg ? '图片' : '视频'}`}
          sourceData={pictureFile}
          handleCallback={(fileList) => setPictureFile([...fileList])}
          maxCount={10}
          maxSize={isImg ? 10 : 100}
          accept={isImg ? `.png, .jpg, .jpeg` : `.mp4, .MP4`}
          videoType={!isImg}
          percentageFlag={isFlagFromCopy ? !isImg : true}
        />
        <p className={styles.uploadExtra}>{isImg ? '建议尺寸为宽1080*高不限制，图片大小＜10M' : '建议采用横屏比例16:9，视频大小＜100M'}</p>
      </Modal>
      <Modal
        title="链接"
        visible={linkVisible}
        maskClosable={false}
        width={300}
        className={styles.quillUploadModal}
        onOk={linkHandler}
        onCancel={() => setLinkVisible(false)}
      >
        <Input value={link} placeholder='请输入关联链接' onChange={(e) => {
          setLink(e.target.value)
        }}/>
      </Modal>
    </div>
  )
}

export default ReactQuillCustom;
