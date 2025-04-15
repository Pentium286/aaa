import { useState, useEffect } from 'react';
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import { Button, Select, Divider, Form, Input, Modal, DatePicker } from "antd";
import "./Scheduler.less";
import { data, selectYear, resourcesList } from "./data";
import moment from 'moment';

const { RangePicker } = DatePicker;

const Scheduler = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [typeStatus, setTypeStatus] = useState("");
  const [dataObj, setDataObj] = useState({}) as any;

  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [days, setDays] = useState(365);
  const [scheduler, setScheduler] = useState(null) as any;

  const onCreate = (values: any, type: any) => {
    console.log('onCreate: ', values);
    if (type === "add") {
      form.resetFields();
      values.name8 = [moment(values.start.value, "YYYY-MM-DD"), moment(values.end.value, "YYYY-MM-DD")];
      setDataObj(values);
      form.setFieldsValue(values);
    } else if (type === "edit") {
      values.name8 = [moment(values.start, "YYYY-MM-DD"), moment(values.end, "YYYY-MM-DD")];
      setDataObj(values);
      form.setFieldsValue(values);
    }
    setTypeStatus(type);
    setOpen(true);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const config = {
    locale: "zh-cn",
    timeHeaders: [
      { groupBy: "Month", format: "MMMM yyyy" },
      { groupBy: "Day", format: "d" }
    ],
    scale: "Day",
    treeEnabled: true,
    treePreventParentUsage: true, // 数据是否禁止拖到父节点
    heightSpec: "Max",
    height: 400,
    cellWidth: 60,
    eventMovingStartEndEnabled: true,
    eventResizingStartEndEnabled: true,
    timeRangeSelectingStartEndEnabled: true,
    eventDoubleClickHandling: true,
    scrollDelayEvents: 0,
    infiniteScrollingEnabled: true, // 无限滚动
    infiniteScrollingStepDays: 100, // 无限滚动
    // rowHeaderColumns: [
    //   { name: "Car" },
    //   { name: "Seats", display: "seats", width: 50 },
    //   { name: "Doors", display: "doors", width: 50 },
    //   { name: "Transmission", display: "transmission", width: 90 },
    // ],
    // 模块移动
    onEventMoved: args => {
      console.log("Event moved: ", args.e.data.id, args.newStart, args.newEnd, args.newResource);
      // scheduler.message("Event moved: " + args.e.data.text);
    },
    // 模块拉伸
    onEventResized: args => {
      console.log("Event resized: ", args.e.data.id, args.newStart, args.newEnd);
      // scheduler.message("Event resized: " + args.e.data.text);
    },
    // 模块直接创建
    onTimeRangeSelected: async args => {
      console.log("onTimeRangeSelected", args);
      if (args.resource === "A" || args.resource === "C") {
        // TODO:新增
        let obj = {
          id: DayPilot.guid(),
          text: "",
          start: args.start,
          end: args.end,
          resource: args.resource,
          holder: true,
          tags: { justCreated: true },
        };
        onCreate(obj, "add");
      } else {
        const e = new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: "",
          tags: { justCreated: true },
          barColor: "#eee68c",
          backColor: "#eee68c",
        });
        scheduler.events.add(e);
        scheduler.clearSelection();
        scheduler.events.edit(e);
      }
    },
    onTimeRangeSelecting: args => {
      console.log("onTimeRangeSelecting", args);
      if (args.resource === "A" || args.resource === "C") {
      } else {
        if (args.duration.totalDays() > 1) {
          args.allowed = false;
          args.left.enabled = false;
          args.right.enabled = true;
          args.right.html = "最大只能选择1天";
        }
      }
    },
    // onEventEdit: args => {
    //   console.log(args);
    //   if (args.e.tag("justCreated")) {
    //     if (args.canceled || args.newText === "") {
    //       scheduler.events.remove(args.e);
    //     }
    //     args.e.data.tags.justCreated = false;
    //   }
    // },
    // 模块单击
    onEventClick: (args) => {
      console.log("onEventClick", args.e.data);
      if (args.e.data.holder) {
        scheduler.eventClickHandling = "Enabled"; // 直接点击编辑
        // DayPilot.Modal.alert(args.e.data.text);
        // TODO:编辑
        onCreate(args.e.data, "edit");
      } else {
        scheduler.eventClickHandling = "Edit"; // 直接点击编辑
        if (args.e.tag("justCreated")) {
          if (args.canceled || args.newText === "") {
            scheduler.events.remove(args.e);
          }
          args.e.data.tags.justCreated = false;
        }
      }
    },
    // // 模块双击
    // onEventDoubleClick: (args) => {
    //   DayPilot.Modal.alert(args.e.data.text);
    // },
    // onBeforeRowHeaderRender: args => {
    //   if (args.row.data.image) {
    //     args.row.columns[0].areas = [
    //       {
    //         left: 10,
    //         top: 8,
    //         width: 24,
    //         height: 24,
    //         image: "cars/" + args.row.data.image,
    //         style: "border-radius: 50%; overflow: hidden;"
    //       }
    //     ];
    //   }
    // },
    // 模块加载前渲染
    onBeforeEventRender: args => {
      // 标题栏自定义
      // console.log(args.data);
      if (args.data.holder) {
        args.data.html = `${args.data.text} - (${args.data.text1})`;
      }
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "编辑",
          onClick: (args) => {
            // scheduler.events.edit(args.source);
            onCreate(args.source.data, "edit");
          }
        },
        {
          text: "删除",
          onClick: async args => {
            const modal = await DayPilot.Modal.confirm("是否要删?");
            if (modal.canceled) {
              return;
            }
            scheduler.events.remove(args.source);
          }
        },
      ],
    })
  };

  const handleToday = () => {
    scheduler.scrollTo(DayPilot.Date.today());
  };

  const handleChangeSelect = (e) => {
    scheduler.scrollTo(`${e}-01-01`);
  };

  const previous = () => {
    scheduler.scrollTo(scheduler.getViewPort().start.addMonths(-1));
  };

  const next = () => {
    scheduler.scrollTo(scheduler.getViewPort().start.addMonths(1));
  };

  const loadData = (args?: any) => {
    const resources = resourcesList as any;
    setResources(resources);

    const events = data as any;
    setEvents(events);
  };

  useEffect(() => {
    loadData();
    scheduler?.scrollTo("2025-04-01");
  }, [scheduler]);

  const handleImport = () => {
    console.log("handleImport");
  };

  const handleAdd = () => {
    // TODO:手动新增
    let obj = {
      id: DayPilot.guid(),
      text: "",
      start: "",
      end: "",
      resource: "",
      holder: true,
      tags: { justCreated: true },
      barColor: "#a5d63f",
      backColor: "#a5d63f",
    };
    console.log(obj);
    setDataObj(obj);
    setTypeStatus("manuallyAdd");
    setOpen(true);
  };

  return (
    <>
      <div className='scheduler'>
        <div className='schedulerBox'>
          <div className='schedulerBoxLeft'>
            <Select
              className='selectStyle'
              onChange={handleChangeSelect}
              options={selectYear}
            />
            <Divider type="vertical" />
            <Button onClick={e => previous()}>上个月</Button>
            <Button onClick={e => handleToday()}>本月</Button>
            <Button onClick={e => next()}>下个月</Button>
          </div>
          <div className='schedulerBoxRight'>
            <Button type="primary" onClick={handleAdd}>新增</Button>
            <Button onClick={handleImport}>导入</Button>
          </div>
        </div>
        <DayPilotScheduler
          {...config}
          startDate={startDate}
          days={days}
          events={events}
          resources={resources}
          controlRef={setScheduler}
        />
      </div>
      <Modal
        open={open}
        title={`${typeStatus === "edit" ? "编辑" : "新增"}生产计划`}
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form.validateFields().then(values => {
            if (typeStatus === "add") {
              dataObj.text = values.name1;
              let obj = { ...values, ...dataObj };
              console.log("新增提交数据", obj);
              scheduler.clearSelection();
              scheduler.events.add(obj);
            } else if (typeStatus === "edit") {
              dataObj.text = values.name1;
              let obj = { ...values, ...dataObj };
              console.log("编辑提交数据", obj);
              scheduler.clearSelection();
              scheduler.events.update(obj);
            } else if (typeStatus === "manuallyAdd") {
              dataObj.text = values.name1;
              dataObj.text1 = values.name4 = 6000;
              // 数据清洗
              resourcesList.forEach(item => {
                if (item.name === values.name6) {
                  dataObj.resource = item.children[0].id;
                }
              });
              dataObj.start = `${values.name8[0].format('YYYY-MM-DD')} 00:00:00`;
              dataObj.end = `${values.name8[1].format('YYYY-MM-DD')} 23:59:59`;
              let obj = { ...values, ...dataObj };
              console.log("新增提交数据", obj);
              scheduler.clearSelection();
              scheduler.events.add(obj);
            }
            form.resetFields();
            setOpen(false);
          }).catch(info => {
            console.log('Validate Failed:', info);
          });
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="form_in_modal"
        >
          <Form.Item
            name="name1"
            label="产品型号"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name2"
            label="釉色"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name3"
            label="销售合同"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                {
                  value: 'XSDD0001',
                  label: 'XSDD0001',
                },
                {
                  value: 'XSDD0002',
                  label: 'XSDD0002',
                },
                {
                  value: 'XSDD0003',
                  label: 'XSDD0003',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="name4"
            label="销售合同数量"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name5"
            label="排产数量"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name6"
            label="生产产线安排"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                {
                  value: '1-1',
                  label: '1-1',
                },
                {
                  value: '1-2',
                  label: '1-2',
                },
                {
                  value: '1-3',
                  label: '1-3',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="name7"
            label="销售合同颜色"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                {
                  value: '红色',
                  label: '红色',
                },
                {
                  value: '灰色',
                  label: '灰色',
                },
                {
                  value: '蓝色',
                  label: '蓝色',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="name8"
            label="生产日期安排"
            rules={[{ required: true }]}
          >
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Scheduler;
