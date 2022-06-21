import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { ToggleButton } from 'primereact/togglebutton'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { rowData_select, rowData_selecty } from '../lib/tabConfig'

export default function BasicDialog({rowDataFlag, clearFunc, type}) {
    const rowDataSele = rowDataFlag=='1' ? rowData_select : rowData_selecty
    const customHeader = rowDataFlag=='1' ? "中古音查詢" : "早期粵音查詢"
    const noteDiv = rowDataFlag=='1' ? <span>※ 除了反切和釋文其他項必填<br/>※ 重紐項只對《廣韻》查詢較精確</span> : <span>※ 除了反切和釋文其他項必填</span>

    const [displayBasic, setDisplayBasic] = useState(false)
    const [position, setPosition] = useState('center')
    const [checkedAll, setCheckedAll] = useState(true)
    const [shows, setShows] = useState<any>([])
    const [items, setItems] = useState<any>([])
    const [fanqieValue, setFanqieValue] = useState('')
    const [explValue, setExplValue] = useState('')

    const router = useRouter()

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const handleCheckAll = () => {
        if (checkedAll) {
            let showStr = [], itemRow = []
            for (let row of rowDataSele) {
                showStr.push(row.show)
                if (row.show!=='反切' && row.show!=='釋文') {
                    let tempArr = (row.show+row.item).replaceAll('|',' ').replaceAll(' ',` ${row.show}`).split(' ')
                    itemRow = Array.from(new Set([...itemRow, ...tempArr]))
                }
            }
            let union = new Set([...shows, ...showStr])
            let union2 = new Set([...items, ...itemRow])
            setShows(Array.from(union))
            setItems(Array.from(union2))
        } else {
            setShows([])
            setItems([])
        }
    }
    
    const querySubmit = () => {
        let searchStr = items.join('_')
        if(searchStr!=='') router.push('/search/' + searchStr + '?queryType=' + (rowDataFlag=='1' ? 'F1' : 'F2') + (shows.indexOf('反切')!==-1 ? ('&reqFanqie=' + fanqieValue) : '') + (shows.indexOf('釋文')!==-1 ? ('&reqExpl=' + explValue) : ''))
      }

    const renderFooter = (name) => {
        return (
            <div className="card flex justify-content-end">
                <Button label="關閉" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-secondary p-button-sm" />
                <ToggleButton checked={checkedAll} onChange={(e) => {setCheckedAll(e.value);handleCheckAll()}} onLabel="全選" offLabel="取消全選" onIcon="pi pi-filter" offIcon="pi pi-filter-slash" className="p-button-sm mr-2" aria-label="Confirmation" />
                <Button label="查詢" icon="pi pi-check" onClick={()=>{querySubmit();clearFunc()}} autoFocus className="p-button-info p-button-sm" />
            </div>
        )
    }

    const onShowChange = (e: { value: any, checked: boolean }) => {
        let selectedShows = [...shows]
        if (e.checked) {
            selectedShows.push(e.value)
        } else {
            selectedShows.splice(selectedShows.indexOf(e.value), 1)
        }
        setShows(selectedShows)
        if (e.value!=='反切' && e.value!=='釋文') handleAllChange(e.value, e.checked)
    }

    const showBodyTemplate = (rowData) => {
        return (
            <span key={"show-"+rowData.show}>
                <Checkbox inputId={"show-"+rowData.show} name="show" value={rowData.show} onChange={onShowChange} checked={shows.indexOf(`${rowData.show}`) !== -1}/>
                <span>  </span>
                <label htmlFor={"show-"+rowData.show}>{rowData.show}</label>
            </span>
        )
    }

    const handleAllChange = (value: string, checked: boolean, groupStr: string = '') =>{
        let itemRow = []
        if (groupStr!=='') {
            itemRow = (value+rowDataSele.find(row => row.show==value).item.replaceAll('|',`|${value}`).replaceAll(' ',` ${value}`)).split('|').find(row => row.indexOf(groupStr)!==-1).split(' ')
        } else {
            itemRow = (value+rowDataSele.find(row => row.show==value).item.replaceAll('|',' ').replaceAll(' ',` ${value}`)).split(' ')
        }
        if (checked) { 
            let union = new Set([...items, ...itemRow])
            setItems(Array.from(union))
        } else {
            let itemRowSet = new Set(itemRow)
            let difference = new Set([...items].filter(x => !itemRowSet.has(x)))
            setItems(Array.from(difference))
        }
    }

    const onItemChange = (e: { value: any, checked: boolean }) => {
        let selectedItems = [...items]
        if (e.checked) {
            selectedItems.push(e.value)
        } else {
            selectedItems.splice(selectedItems.indexOf(e.value), 1)
        }
        setItems(selectedItems)
        if (/聲/.test(e.value) && /組/.test(e.value)) {
            handleAllChange('聲', e.checked, e.value)
        }
        if (rowDataFlag=='1' && /韻/.test(e.value) && (/陰/.test(e.value) || (/陽/.test(e.value) && e.value!=='韻陽') || /入/.test(e.value))) {
            handleAllChange('韻', e.checked, e.value)
        }
        if (rowDataFlag=='2' && /韻/.test(e.value) && /第/.test(e.value)) {
            handleAllChange('韻', e.checked, e.value)
        }

    }

    const itemBodyTemplate = (rowData) => {
        let itemRow = rowData.item.split('|')
        let eleDiv = []
        if (rowData.show!=='反切' && rowData.show!=='釋文') {
            for (let i in itemRow) {
                let itemList = itemRow[i].split(' ')
                for (let j in itemList) {
                    eleDiv.push(
                        <span key={"item-"+rowData.show+itemList[j]}>
                            <Checkbox inputId={"item-"+rowData.show+itemList[j]} name="item" value={rowData.show+itemList[j]} onChange={onItemChange} checked={items.indexOf(`${rowData.show+itemList[j]}`) !== -1}/>
                            <span>  </span>
                            <label htmlFor={"item-"+rowData.show+itemList[j]}>{itemList[j]}</label>
                            {(j == (itemList.length-1).toString() && (rowData.show=='聲'||rowData.show=='韻')) ? <span><br/><br/></span> : <span>&emsp;</span>}
                        </span>
                    )
                }
            }
        }

        if (rowData.show=='反切') eleDiv = [<InputText key="fanqie" className={(shows.indexOf('反切')!==-1) ? "fanqieInput" : "fanqieInput p-disabled"} value={fanqieValue} onChange={(e) => setFanqieValue(e.target.value)} />]
        if (rowData.show=='釋文') eleDiv = [<InputText key="expl" className={(shows.indexOf('釋文')!==-1) ? "explInput" : "explInput p-disabled"} value={explValue} onChange={(e) => setExplValue(e.target.value)} />]

        return (
            <div className="card">{eleDiv}</div>
        )
    }

    const headerGroup = <ColumnGroup>
                            <Row>
                                <Column header="說明" rowSpan={2} align="center" />
                                <Column header="選項" rowSpan={1} colSpan={2} align="center" />
                            </Row>
                        </ColumnGroup>

  return (
    <div>
        <Button className={"p-button-outlined p-button-sm "+((router.pathname!='/' && type=='單字') ? '' : 'hidden')} style={{ height: '2.25rem', color: '#30aa9f' }} label={customHeader} onClick={() => onClick('displayBasic', position)} />
        <Dialog header={customHeader} visible={displayBasic} style={{ width: 'auto', overflow: 'auto' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
            <div className="card" style={{width: 'max-content'}}>
                <DataTable value={rowDataSele} size="small" headerColumnGroup={headerGroup} stripedRows showGridlines responsiveLayout="scroll">
                    <Column key="guyinShow" field="show" header="說明" body={showBodyTemplate}></Column>
                    <Column key="guyinItem" field="item" header="選項" body={itemBodyTemplate}></Column>
                </DataTable>
                {noteDiv}
            </div>
        </Dialog>
    </div>
  )
}
  