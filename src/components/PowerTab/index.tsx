import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { getMenuList } from './service'
import {  Tree, Checkbox, Tabs } from 'antd';
import './index.less'
const PowerTab = (props,ref) => {
  useImperativeHandle(ref, () => ({
    sumbit,
  }));
    const [menuList, setMenuList] = useState<any>([])
    const [checkedKeys, setCheckedKeys] = useState<any>([]);
    useEffect(()=>{
        const fn = async()=>{
            const menu = await getMenuList({currPage:1,pageSize:999});
            initMenu(menu)
        }
        fn();
        setCheckedKeys(props.checkedKeys)
    },[])
    useEffect(()=>{
      setCheckedKeys(props.checkedKeys)
    },[props.checkedKeys])
    const initMenu = (menu) => {
      // TODO:一级菜单不能超过99
        let arr1: any = [];
        menu?.forEach(item => {
            if (item.level === 1) {
                arr1.push({ ...item, children: [] })
            }
        })
        arr1.forEach(item => {
            menu?.forEach(item2 => {
                if (Number(item2.code.slice(0,item2.code.length - 3)) === Number(item.code) && item2.level === 2) {
                    item.children.push({ ...item2, children: [] })
                }
            })
        })
        arr1.forEach(item => {
            if (item.children.length !== 0) {
                item.children.forEach(item2 => {
                    menu.forEach(item3 => {
                        if (Number(item3.code.slice(0,item3.code.length - 3)) === Number(item2.code) && item3.level === 3) {
                            item2.children.push({ ...item3, children: [] })
                        }
                    })
                })
            }
        })
        setMenuList(arr1)
    }
    const onCheck = (checkedKeysValue, e) => {
        let checkObj: any = {}
        let id1: any = null;
        let id2: any = null;
        let newKey: any = []
        menuList.forEach(item => {
          item.children.forEach(item2 => {
            if (item2.id === e.node.id) {
              checkObj = item
              return;
            }
            item2.children.forEach(item3=>{
              if(item3.id === e.node.id){
                id1 = item.id;
                id2 = item2.id;
              return;
              }
            })
          })
        })
        if (e.checked) {
          // 选中二级逻辑
          if (e.node.level === 2) {
            newKey.push(checkObj.id)
            checkObj.children?.forEach(item => {
              if (item.id === e.node.id) {
                newKey.push(item.id)
                item.children.forEach(item2 => {
                  newKey.push(item2.id)
                })
              }
            })
            setCheckedKeys(getArr(newKey, checkedKeys))
          }
          // 选中三级逻辑
          if (e.node.level === 3) {
            let id = e.node.id
            let newList: any = [];
            newList.push(id1, id2, id)
            setCheckedKeys(getArr(checkedKeys, newList))
          }
        } else {
          // 取消二级逻辑
          if (e.node.level === 2) {
            checkObj.children?.forEach(item => {
              if (item.id === e.node.id) {
                newKey.push(item.id)
                item.children.forEach(item2 => {
                  newKey.push(item2.id)
                })
              }
            })
            setCheckedKeys(deletArr(checkedKeys, newKey))
          }
          // 取消三级逻辑
          if (e.node.level === 3) {
            let id = e.node.id
            setCheckedKeys(deletArr(checkedKeys, [id]))
          }
        }
      };
    const onChange = (e, id) => {
        let newObj = menuList.find(item => item.id === id);
        let newKey: any = []
        newKey.push(newObj.id)
        newObj.children?.forEach(item => {
            newKey.push(item.id)
            item.children.forEach(item2 => {
                newKey.push(item2.id)
            })
        })
        if (e.target.checked) {
            setCheckedKeys(getArr(newKey, checkedKeys))
        } else {
            setCheckedKeys(deletArr(checkedKeys, newKey))
        }
    }
    // 去重
    const getArr = (arr1, arr2) => {
        return Array.from(new Set([...arr1, ...arr2]))
    }
    // 删除
    const deletArr = (arr1, arr2) => {
        let new_set = new Set(arr1);
        arr2.forEach(item => {
            new_set.delete(item)
        })
        return Array.from(new_set)
    }
    const sumbit =() => {
      return checkedKeys
    }
    return (
        <div className='power'>
            <Tabs defaultActiveKey="0" items={menuList.map(item => {
                return {
                    key: item.id.toString(),
                    label: <span>
                        <Checkbox style={{ marginRight: '8px' }}
                            checked={checkedKeys?.includes(item.id)}
                            onChange={(e) => onChange(e, item.id)}
                            disabled={props.disabled}
                        />
                        {item.name}
                    </span>,
                    children: <Tree
                        checkable
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        treeData={item.children}
                        defaultExpandAll={true}
                        checkStrictly={true}
                        disabled={props.disabled}
                        fieldNames={{ title: 'name', key: 'id' }}
                    />
                }
            })}>
            </Tabs>
        </div>
    )
}
export default forwardRef(PowerTab)
