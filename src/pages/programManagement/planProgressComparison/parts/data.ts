const barColor = (i) => {
  const colors = ["#42cf7c", "#d42f31", "#2b82e4", "#cc0000"];
  return colors[i % 4];
};

// 表格数据
export const resourcesList = [
  {
    name: "1-1", id: "G1", expanded: true, children: [
      { name: "合同名称", seats: 4, doors: 2, transmission: "Automatic", id: "A" },
      { name: "生产计划", seats: 4, doors: 2, transmission: "Automatic", id: "B" },
    ]
  },
  {
    name: "1-2", id: "G2", expanded: true, children: [
      { name: "合同名称", seats: 5, doors: 4, transmission: "Automatic", id: "C" },
      { name: "生产计划", seats: 5, doors: 4, transmission: "Automatic", id: "D" },
    ]
  },
  {
    name: "1-3", id: "G3", expanded: true, children: [
      { name: "合同名称", seats: 5, doors: 4, transmission: "Automatic", id: "E" },
      { name: "生产计划", seats: 5, doors: 4, transmission: "Automatic", id: "F" },
    ]
  },
];

// 单元格数据
export const data = [
  {
    id: 101,
    text: "Y28368 灰-合同A01",
    text1: "7000",
    start: "2025-04-01 00:00:00",
    end: "2025-04-13 23:59:59",
    resource: "A",
    barColor: barColor(0),
    backColor: barColor(0),
    name1: "Y28368 灰-合同A01",
    name2: "灰",
    name3: "XSDD0002",
    name4: "6000",
    name5: "7000",
    name6: "1-1",
    name7: "蓝色",
    holder: true,
  },
  {
    id: 111,
    text: "实际完成进度",
    text1: "6000",
    start: "2025-04-01 00:00:00",
    end: "2025-04-12 23:59:59",
    resource: "B",
    barColor: barColor(2),
    backColor: barColor(2),
    name1: "Y28368 灰-合同A01",
    name2: "灰",
    name3: "XSDD0002",
    name4: "6000",
    name5: "7000",
    name6: "1-1",
    name7: "蓝色",
    holder: false,
  },
  {
    id: 203,
    text: "Y14164-合同A02",
    text1: "5000",
    start: "2025-04-01 00:00:00",
    end: "2025-04-08 23:59:59",
    resource: "C",
    barColor: barColor(1),
    backColor: barColor(1),
    holder: true,
  },
  {
    id: 214,
    text: "实际完成进度",
    text1: "5000",
    start: "2025-04-01 00:00:00",
    end: "2025-04-08 23:59:59",
    resource: "D",
    barColor: barColor(2),
    backColor: barColor(2),
    name1: "Y14164 灰-合同A02",
    name2: "灰",
    name3: "XSDD0004",
    name4: "3000",
    name5: "4000",
    name6: "1-2",
    name7: "红色",
    holder: false,
  },
];

export const selectYear = [
  { label: "2020年", value: 2020 },
  { label: "2021年", value: 2021 },
  { label: "2022年", value: 2022 },
  { label: "2023年", value: 2023 },
  { label: "2024年", value: 2024 },
  { label: "2025年", value: 2025 },
];

export const selectMonth = [
  { label: "12月", value: "12" },
  { label: "11月", value: "11" },
  { label: "10月", value: "10" },
  { label: "9月", value: "09" },
  { label: "8月", value: "08" },
  { label: "7月", value: "07" },
  { label: "6月", value: "06" },
  { label: "5月", value: "05" },
  { label: "4月", value: "04" },
  { label: "3月", value: "03" },
  { label: "2月", value: "02" },
  { label: "1月", value: "01" },
];