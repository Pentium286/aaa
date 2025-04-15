import React, { useRef, useState, useEffect } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Drawer, Tabs, Space, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { CloseOutlined } from '@ant-design/icons';
import './index.less';
import { getTypeList } from './service';
import { itemType } from "./data";

export type SelectGoodsProps = {
  visible: boolean;
  config: any[];  // [{key, request}], 每个tab下的相关信息
  selectedAll: {},  // {key: {selectedRowKeys, selectedRowsAll}}外部传入的各tab的选中情况
  title?: string,
  destroyOnClose?: boolean,  // 每次打开弹窗时是否需要初始化
  onOk: (data?: any) => void;
  onCancel: () => void;
};

const SelectGoods: React.FC<SelectGoodsProps> = (props) => {
  const {
    visible,
    config = [],
    selectedAll = {},
    ...restProps
  } = props;

  const [currentTab, setCurrentTab] = useState(config[0].key);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedRowsAll, setSelectedRowsAll] = useState<any[]>([]);
  const [selectedObj, setSelectedObj] = useState(selectedAll);

  const tableRef = useRef<ActionType>();
  const columns: any = [
    {
      title: '品项名称',
      key: 'itemName',
      dataIndex: 'itemName',
    },
    {
      title: '品项类型',
      dataIndex: 'itemType',
      key: 'itemType',
      render: (_, record) => {
        let arr = [] as any;
        Object.keys(itemType).forEach(itemTypeItem => {
          _.split(",").forEach(_Item => {
            if (Number(itemTypeItem) === Number(_Item)) {
              arr.push(itemType[Number(_Item)].text);
            }
          });
        });
        return <>{arr.join("、")}</>;
      },
      search: false,
    },
    {
      title: 'ERP项目类型',
      dataIndex: 'erpItemType',
      valueType: 'select',
      request: getTypeList,
      render: (_, record) => <span>{record.erpItemType == "0" ? "生美" : "医美"}</span>,
      search: false,
    },
  ];

  useEffect(() => {
    if (visible) {
      setSelectedObj(selectedAll);
      setCurrentTab(config[0].key);
      setSelectedRowKeys(selectedAll[currentTab].selectedRowKeys);
      setSelectedRowsAll(selectedAll[currentTab].selectedRowsAll);
    }
  }, [visible]);

  const rowSelection = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      console.log('selectedRowKeys:', selectedRowKeys);
      let addArr = selectedRowKeys.filter(key => !selectedRowsAll.some(row => row?.id === key));
      let removeArr = selectedRowsAll.filter(row => !selectedRowKeys.some(key => key === row?.id));
      removeArr?.forEach(item => {
        const index = selectedRowsAll.findIndex(row => row?.id === item?.id);
        if (index !== -1) {
          selectedRowsAll.splice(index, 1);
        }
      });
      addArr?.forEach(key => {
        selectedRowsAll.push(selectedRows.find(row => row?.id === key));
      });
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRowsAll(selectedRowsAll);
      selectedObj[currentTab] = {
        selectedRowKeys: JSON.parse(JSON.stringify(selectedRowKeys)),
        selectedRowsAll: JSON.parse(JSON.stringify(selectedRowsAll))
      };
      setSelectedObj(selectedObj);
    }
  };

  const onTabChange = (key: any) => {
    setCurrentTab(key);
    setSelectedRowKeys(selectedObj[key] ? selectedObj[key].selectedRowKeys : []);
    setSelectedRowsAll(selectedObj[key] ? selectedObj[key].selectedRowsAll : []);
  };

  return (
    <Drawer
      className="selectItem"
      title={restProps.title}
      visible={visible}
      width={820}
      closable={false}
      destroyOnClose={restProps.destroyOnClose || false}
      footerStyle={{ textAlign: 'center', padding: '20px 16px' }}
      footer={
        <Space align='center'>
          <Button onClick={restProps.onCancel}>取消</Button>
          <Button type="primary" onClick={() => restProps.onOk(selectedObj)}>确定</Button>
        </Space>
      }
      extra={
        <CloseOutlined onClick={restProps.onCancel} />
      }
      onClose={restProps.onCancel}
    >
      <Tabs onChange={onTabChange}>
        {
          config.map(item => (
            <Tabs.TabPane tab={item.name} key={item.key} />
          ))
        }
      </Tabs>
      <ProTable
        actionRef={tableRef}
        request={config[currentTab].request}
        columns={columns}
        options={false}
        rowKey='id'
        search={{
          defaultCollapsed: false,
          collapseRender: () => null
        }}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={{
          showSizeChanger: true,
        }}
      ></ProTable>
    </Drawer>
  );
};

export default SelectGoods;