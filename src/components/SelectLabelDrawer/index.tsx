import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Input,  Button, Drawer, Form,Table,Collapse } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import _ from 'lodash';
import './index.less';
import { getLabelByCate } from '@/utils/commonApi'

const { Panel } = Collapse;

let globalArr = [] as any;
const SelectLabelDrawer = (props, ref) => {
    const [selectedTagId, setSelectedTagId] = useState(0); // 默认第一个标签分类
    const [collapseId, setCollapseId] = useState(1); // 获取上一个打开的标签分类设置成当前打开的
    const [open, setOpen] = useState(false)
    const [searchData, setSearchData] = useState<any>("");
    const [categoryList, setCategoryList] = useState<any>([]); // 
    const [tableList, setTableList] = useState<any>([]);
    const [selectedRowKeysArr, setSelectedRowKeysArr] = useState<any>([]); // 选中 code 数组，用于 table checkbox
    const [selectedRowsAll, setSelectedRowsAll] = useState<any>([]); // 选中 item 数组，用于右侧展示
    const [tagRowsClose, setTagRowsClose] = useState<any>([]);  // 历史选中item数组
    const [tagCodeClose, setTagCodeClose] = useState<any>([]);  // 历史选中code数组

    const columns = [{ title: '标签名称', dataIndex: 'name', ellipsis: true }];
    const openLabel = (flag) => {
        setOpen(flag)
    }
    useImperativeHandle(ref, () => ({
        openLabel
    }));
    // 获取标签
    const getTag = async (categoryId,name) => {
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '') || {};
            const res = await getLabelByCate({status:0,timeStatus:1,companyType:0,companyId:userInfo?.data.companyId,categoryId,name})
            if (res.success) {
                setTableList(res?.data || [])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (open) {
            if (props.bindTags && props.bindTags.length) {
                setSelectedRowsAll([...props.bindTags])
                const newArr = props.bindTags?.map(item => { return item.code; });
                setSelectedRowKeysArr([...newArr])
                globalArr = newArr
                setTableList([...tableList])
            } else {
                setSelectedRowsAll([])
                setSelectedRowKeysArr([])
            }
        }
      }, [open]);
    
  useEffect(() => {
    setCategoryList(props?.category || [])
    getTag(props.category[0].childList[0].id,searchData);
    setSelectedTagId(props.category[0].childList[0].id)
    setCollapseId(props.category[0].id)
  }, []);
    useEffect(() => {
        if (props.bindTags && props.bindTags.length) {
            const newArr = props.bindTags?.map(item => { return item.code; }) || [];
            setTagCodeClose([...newArr]);
            setTagRowsClose([...props.bindTags])
        } else {
            setTagCodeClose([]);
            setTagRowsClose([]);
        }
    },[props.bindTags])
  // 搜索
  const handleSearch = async () => {
    if (searchData) {
        getTag('', searchData);
    } else {
        getTag(selectedTagId, searchData);
    }
    
  };
  // 重置
  const handleClear = () => {
    setSearchData("");
    getTag(selectedTagId, '');
  };
  // 设置选中
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: any) => {
    const tableListArr = [] as any;
    tableList.map(item => {
      tableListArr.push(item.code);
    });
    let newArray = [] as any;
    selectedRowKeys.map((item: any) => {
      globalArr.push(item);
    });
    newArray = _.uniq(globalArr);
    const lastArr = _.xor(_.intersection(_.xor(tableListArr, selectedRowKeys), newArray), newArray);

    const addArr = lastArr.filter(key => !selectedRowsAll.some(row => row.code === key));
    const removeArr = selectedRowsAll.filter(row => !lastArr.some(key => key === row.code));
    addArr.forEach(key => {
      selectedRowsAll.push(selectedRows.find(row => row.code === key));
    });

    _.pullAll(selectedRowsAll, removeArr);

    const kl = [] as any;
    _.compact(selectedRowsAll).map((item: any) => {
      kl.push(item.code);
    });
    setSelectedRowKeysArr(kl);
    setSelectedRowsAll(_.compact(selectedRowsAll));
  };
  // 删除
  const onDelRow = (code: any) => {
    const a1 = selectedRowKeysArr;
    _.remove(a1, function (n) {
      return n === code;
    });
    setSelectedRowKeysArr([...a1]);
    const a2 = selectedRowsAll;
    _.remove(selectedRowsAll, function (n: any) {
      if (n.code === code) {
        n.checkbox = false;
      }
      return n.code === code;
    });
    setSelectedRowsAll([...a2]);
  };
  // 全选/选中状态
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
  };
  const onClose = () => {
    const closeArr = [] as any;
    tagCodeClose.forEach(key => {
      closeArr.push(tagRowsClose.find(row => row.code === key));
    });
    setSelectedRowsAll([...closeArr]);
    props.onCloseTag(closeArr)
  };
  // 点击标签分类
  const onTagClick = (tag) => {
    setSelectedTagId(tag.id)
    setCollapseId(tag.parentId)
    getTag(tag.id,'')
  };
    // 确认
  const onDrawerSubmit = () => {
    const arr = [] as any;
    const newArr = [] as any;
    for (const item of selectedRowsAll) {
      arr.push({
        ...item,
        code: item.code,
      });
      newArr.push(item.code)
    }
    setTagCodeClose([...newArr]);
    setTagRowsClose([...selectedRowsAll])
    props.onOk(arr)
    setOpen(false);
  };
  return (
      <>
        <Drawer title="请选择标签"
            placement="right"
            width={960}
            onClose={onClose}
            open={open}
            closable={false}
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
            extra={
            <CloseOutlined onClick={onClose} />
            }
            className="selectLabel"
        >
            <div className='drawerTag'>
          <div className='contentTop'>
            <Form layout='inline'>
              <Form.Item label='标签名称：'>
                <Input value={searchData} onChange={(e) => setSearchData(e.target.value)} style={{ width: '320px' }}></Input>
              </Form.Item>
              <div className='btnBox'>
                <Button onClick={handleClear}>重置</Button>
                <Button type='primary' onClick={handleSearch}>搜索</Button>
              </div>
            </Form>
          </div>
            <div className='contentBottom'>
                <div className="leftBox">
                  <Collapse expandIconPosition="right" accordion defaultActiveKey={collapseId || 1} className="label_collapse">
                    {(categoryList || []).map((cat) => (
                        <Panel header={cat.name} key={cat.id}>
                            <ul className="catList">
                                {cat.childList.map((child) => (
                                <li
                                    className={
                                        child.id === selectedTagId ? 'tagDivActive' : ''
                                    }
                                    key={child.id}
                                    onClick={() => onTagClick(child)}
                                >
                                    {child.name}
                                </li>
                                ))}
                            </ul>
                        </Panel>
                    ))}
                  </Collapse>
                </div>
                <div className='centerBox'>
                    <Table className="tableWrap"
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={tableList || []}
                        rowKey='code'
                        size='middle'
                        scroll={{ y: 500 }}
                        pagination={false}
                    />
                </div>
                <div className='rightBox'>
                    <div className='title'>
                        <span>已选{selectedRowsAll.length}个标签</span>
                        <Button
                        onClick={() => {
                            setSelectedRowKeysArr([]);
                            setSelectedRowsAll([]);
                        }}
                        >清空</Button>
                    </div>
                    <ul className='checkedUl'>
                        {
                        selectedRowsAll.map((item: any) => {
                            return (
                            <li className="checkedLi" key={item.code}>
                                <span className="name">{item.name}</span>
                                <span className="del" onClick={() => onDelRow(item.code)}></span>
                            </li>
                            );
                        })
                        }
                    </ul>
                </div>
          </div>
              </div>
            <div className='drawerBtn'>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                <Button onClick={onDrawerSubmit} type="primary">确定</Button>
            </div>
        </Drawer>
    </>
  );
};
export default forwardRef(SelectLabelDrawer);