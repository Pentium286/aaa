import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Input, Checkbox, Divider } from 'antd';
import { getDepartment, getPermission, addPermission } from './service'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const gptCompanyInfo = JSON.parse(sessionStorage.getItem('gptCompanyInfo') || '{}');
const companyId = gptCompanyInfo.assoCompanyId;
import './index.less'
const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
const Power = (props, ref) => {
  useImperativeHandle(ref, () => ({
    sumbit,
  }));
  const [open, setOpen] = useState(false)
  const [pepartmentcheckAll, setPepartmentcheckAll] = useState(false)
  const [store, setStore] = useState([])
  const [department, setDepartment] = useState([])
  useEffect(() => {
    init();
  }, [])
  const showTag = () => {
    setOpen(true)
  }
  const sumbit = async () => {
    let newDepartment = [...department]
    let newStore = [...store]
    console.log(newDepartment);
    console.log(newStore);

    let addPepartment = {
      menuPermissions: [],
      menuType: props.menuType,
      recordId: props.recordId,
    }
    newDepartment.forEach((item1, index) => {
      addPepartment.menuPermissions.push({
        permissionType: 0,
        companyId: item1.id,
        companyName: item1.companyName,
        departments: []
      })
      item1.departments.forEach(item2 => {
        if (item2.isCheck) {
          addPepartment.menuPermissions[index].departments.push({
            id: item2.id,
            name: item2.name,
          })
        }
      })
    })
    newStore.forEach((item1, index) => {
      addPepartment.menuPermissions.push({
        permissionType: 1,
        companyId: item1.id,
        companyName: item1.companyName,
        departments: []
      })
      item1.departments.forEach(item2 => {
        if (item2.isCheck) {
          addPepartment.menuPermissions[index + newDepartment.length].departments.push({
            id: item2.id,
            name: item2.name,
          })
        }
      })
    })
    const res = await addPermission(addPepartment)
    if (res.success) {
      return true
    }
  }
  const init = async () => {
    // 	0门店,1部门
    const originalStore = await getDepartment({ type: 0, companyId: companyId })
    const originalDepartment = await getDepartment({ type: 1, companyId: companyId })
    if (props.recordId) {
      const res = await getPermission({ menuType: props.menuType, recordId: props.recordId })
      originalStore.map(item1 => {
        item1.display = true;
        item1.departments.map(item2 => {
          item2.isCheck = false;
          item2.search = true;
        })
      })
      originalDepartment.map(item1 => {
        item1.display = true;
        item1.departments.map(item2 => {
          item2.isCheck = false;
          item2.search = true;
        })
      })
      res.map(item1 => {
        originalDepartment.map(item2 => {
          if (item1.companyId === item2.id) {
            item2.departments.map(item3 => {
              item1.departments.map(item4 => {
                if (item3.id === item4.id) {
                  item3.isCheck = true
                }
              })
            })
          }
        })
      })
      res.map(item1 => {
        originalStore.map(item2 => {
          if (item1.companyId === item2.id) {
            item2.departments.map(item3 => {
              item1.departments.map(item4 => {
                if (item3.id === item4.id) {
                  item3.isCheck = true
                }
              })
            })
          }
        })
      })

      setStore(originalStore)
      setDepartment(originalDepartment)
    }
  }
  // 更新部门
  const departmentsOnChange = (e, index1, index2) => {
    let newDepartment = [...department]
    newDepartment[index1].departments[index2].isCheck = e.target.checked
    setDepartment(newDepartment)
  }
  // 更新门店
  const storeOnChange = (e, index1, index2) => {
    let newStore = [...store]
    newStore[index1].departments[index2].isCheck = e.target.checked
    setStore(newStore)
  }
  // 全选部门
  const departmentscheckAllOnChange = (e, index) => {
    let newDepartment = [...department]
    newDepartment[index].departments.map((item) => {
      item.isCheck = e.target.checked
    })
    setDepartment(newDepartment)
  }
  // 全选门店
  const storeCheckAllOnChange = (e, index) => {
    let newStore = [...store]
    newStore[index].departments.map((item) => {
      item.isCheck = e.target.checked
    })
    setStore(newStore)
  }
  // 搜索部门
  const searchDepartment = (value) => {
    let newDepartment = [...department]
    if (value) {
      newDepartment.map(item1 => {
        item1.departments.map(item2 => {
          if (item2.name.indexOf(value) >= 0) {
            item2.search = true
          } else {
            item2.search = false
          }
        })
      })
    } else {
      newDepartment.map(item1 =>
        item1.departments.map(item2 => {
          item2.search = true
        })
      )
    }
    setDepartment(newDepartment)
  }
  // 搜索门店
  const searchStore = (value) => {
    let newStore = [...store]
    if (value) {
      newStore.map(item1 => {
        item1.departments.map(item2 => {
          if (item2.name.indexOf(value) >= 0) {
            item2.search = true
          } else {
            item2.search = false
          }
        })
      })
    } else {
      newStore.map(item1 =>
        item1.departments.map(item2 => {
          item2.search = true
        })
      )
    }
    setStore(newStore)
  }
  const changeDisplay = (type, index, display) => {
    // type0切换部门 type1切换门店
    if (type === 0) {
      let newDepartment = [...department]
      newDepartment[index].display = display;
      setDepartment(newDepartment)
    } else if (type === 1) {
      let newStore = [...store]
      newStore[index].display = display;
      setStore(newStore)
    }
  }
  return (
    <div className="power">
      <div className="powerHead">
        <span>不可见部门：</span>
        <Search
          placeholder="请输入部门名称进行搜索 "
          enterButton="搜索"
          onSearch={value => searchDepartment(value)}
          style={{ width: '300px' }}
        />
      </div>
      {
        department?.map((item1, index1) => {
          return (
            <div className="powerContent" key={item1.id}>
              <div className="powerContentName" >
                {
                  item1.display ?
                    <DownOutlined onClick={() => { changeDisplay(0, index1, false) }} className="icon" />
                    : <UpOutlined onClick={() => { changeDisplay(0, index1, true) }} className="icon" />
                }
                {item1.companyName}：
              </div>
              <div className="powerBox" >
                <div><Checkbox disabled={props.disabled} onChange={(e) => departmentscheckAllOnChange(e, index1)}>全选</Checkbox></div>
                <div className="checkBox" style={{ display: item1.display ? 'block' : 'none' }}>
                  {
                    item1.departments.map((item2, index2) => {
                      return item2.search ?
                        <Checkbox disabled={props.disabled} style={{ width: '150px' }} key={item2.id} checked={item2.isCheck} onChange={(e) => departmentsOnChange(e, index1, index2)}>{item2.name}</Checkbox>
                        : null
                    })
                  }
                </div>
              </div>
            </div>)
        })
      }
      <div className="powerHead" style={{ marginTop: '20px' }}>
        <span>不可见门店：</span>
        <Search
          placeholder="请输入部门名称进行搜索 "
          enterButton="搜索"
          onSearch={value => searchStore(value)}
          style={{ width: '300px' }}
        />
      </div>
      {
        store?.map((item1, index1) => {
          return <div className="powerContent" key={item1.id}>
            <div className="powerContentName">
              {
                item1.display ?
                  <DownOutlined onClick={() => { changeDisplay(1, index1, false) }} className="icon" />
                  : <UpOutlined onClick={() => { changeDisplay(1, index1, true) }} className="icon" />
              }
              {item1.companyName}：
            </div>
            <div className="powerBox">
              <div><Checkbox disabled={props.disabled} onChange={(e) => storeCheckAllOnChange(e, index1)}>全选</Checkbox></div>
              <div className="checkBox" style={{ display: item1.display ? 'block' : 'none' }}>
                {
                  item1.departments.map((item2, index2) => {
                    return item2.search ?
                      <Checkbox disabled={props.disabled} style={{ width: '150px' }} key={item2.id} checked={item2.isCheck} onChange={(e) => storeOnChange(e, index1, index2)}>{item2.name}</Checkbox>
                      : null
                  })
                }
              </div>
            </div>
          </div>
        })
      }
    </div>
  );
};

export default forwardRef(Power);
