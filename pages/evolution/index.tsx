import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'
import { Divider } from 'primereact/divider'
import { Checkbox } from 'primereact/checkbox'
import { RadioButton } from 'primereact/radiobutton'
import { TreeSelect } from 'primereact/treeselect'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useRouter } from 'next/router'

export default function EvolutionIndex() {

  const [old_phonology, set_old_phonology] = useState<any>(['聲類'])
  const [modern_phonology, set_modern_phonology] = useState('聲母')
  const [nodes, setNodes] = useState(null)
  const [selectedNodeKeys, setSelectedNodeKeys] = useState(null)
  const [response, setResponse] = useState(null)
  const router = useRouter()
  const toast = useRef(null)

  const onPhonologyChange = (e: { value: any, checked: boolean }) => {
      let selectedPhonologys = [...old_phonology];

      if (e.checked)
          selectedPhonologys.push(e.value);
      else
          selectedPhonologys.splice(selectedPhonologys.indexOf(e.value), 1);

      set_old_phonology(selectedPhonologys);
  }

  const makeRequest = async () => {
    const res = await fetch('/api/hello')

    console.log(res)
    setResponse({
      status: res.status,
      body: await res.json(),
      limit: res.headers.get('X-RateLimit-Limit'),
      remaining: res.headers.get('X-RateLimit-Remaining'),
    })
  }

  useEffect(() => {
    setNodes(treetablenodes)
  }, [])

  const queryEvolution = () => {
    console.log(selectedNodeKeys)
    if (selectedNodeKeys === null || JSON.stringify(selectedNodeKeys) === '{}') {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'請選擇材料！', life: 3000})
      return false
    }
    if (old_phonology.length==0) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'請選擇中古音類別！', life: 3000})
      return false
    }

    router.push('/evolution/123')
  }

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        演化規律查詢
      </h1>

      <p className={styles.description}>
        查詢南寧方言從中古音至現代音的演化規律
      </p>

      <div className="treeselect-demo">
          <div className="card">
            <div className="m-2">
              <h2>材料</h2>
              <TreeSelect value={selectedNodeKeys} options={nodes} onChange={(e) => setSelectedNodeKeys(e.value)} display="chip" selectionMode="checkbox" placeholder="Select Items"></TreeSelect>
            </div>
          </div>
      </div>

      <div className="card">
          <div className="grid">
              <div className="col-8 flex align-items-center justify-content-center">
                  <div className="p-fluid">
                    <h2>中古音</h2>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology1" name="old_phonology" value="聲類" onChange={onPhonologyChange} checked={old_phonology.indexOf('聲類') !== -1} />
                        <label htmlFor="old_phonology1">聲類（不分輕重唇）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology2" name="old_phonology" value="韻類" onChange={onPhonologyChange} checked={old_phonology.indexOf('韻類') !== -1} />
                        <label htmlFor="old_phonology2">韻類（平兼上去、入聲獨立）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology3" name="old_phonology" value="重紐" onChange={onPhonologyChange} checked={old_phonology.indexOf('重紐') !== -1} />
                        <label htmlFor="old_phonology3">重紐（A、B、X、O）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology4" name="old_phonology" value="開合" onChange={onPhonologyChange} checked={old_phonology.indexOf('開合') !== -1} />
                        <label htmlFor="old_phonology4">開合（開、合）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology5" name="old_phonology" value="四等" onChange={onPhonologyChange} checked={old_phonology.indexOf('四等') !== -1} />
                        <label htmlFor="old_phonology5">四等（一、二、三、四）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology6" name="old_phonology" value="四調" onChange={onPhonologyChange} checked={old_phonology.indexOf('四調') !== -1} />
                        <label htmlFor="old_phonology6">四調（平、上、去、入）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology7" name="old_phonology" value="清濁" onChange={onPhonologyChange} checked={old_phonology.indexOf('清濁') !== -1} />
                        <label htmlFor="old_phonology7">清濁（全清、次清、全濁、次濁）</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="old_phonology8" name="old_phonology" value="韻尾" onChange={onPhonologyChange} checked={old_phonology.indexOf('韻尾') !== -1} />
                        <label htmlFor="old_phonology8">韻尾（零、m、n、ŋ、p、t、k）</label>
                    </div>
                  </div>
              </div>
              <div className="col-1">
                  <Divider layout="vertical">
                      <b>TO</b>
                  </Divider>
              </div>
              <div className="col-3 flex align-items-center justify-content-center">
                <div className="p-fluid">
                  <h2>現代音</h2>
                  <div className="field-radiobutton">
                      <RadioButton inputId="modern_phonology1" name="modern_phonology" value="聲母" onChange={(e) => set_modern_phonology(e.value)} checked={modern_phonology === '聲母'} />
                      <label htmlFor="modern_phonology1">聲母</label>
                  </div>
                  <div className="field-radiobutton">
                      <RadioButton inputId="modern_phonology2" name="modern_phonology" value="韻母" onChange={(e) => set_modern_phonology(e.value)} checked={modern_phonology === '韻母'} />
                      <label htmlFor="modern_phonology2">韻母</label>
                  </div>
                  <div className="field-radiobutton">
                      <RadioButton inputId="modern_phonology3" name="modern_phonology" value="介音" onChange={(e) => set_modern_phonology(e.value)} checked={modern_phonology === '介音'} />
                      <label htmlFor="modern_phonology3">介音</label>
                  </div>
                  <div className="field-radiobutton">
                      <RadioButton inputId="modern_phonology4" name="modern_phonology" value="元音" onChange={(e) => set_modern_phonology(e.value)} checked={modern_phonology === '元音'} />
                      <label htmlFor="modern_phonology4">元音</label>
                  </div>
                  <div className="field-radiobutton">
                      <RadioButton inputId="modern_phonology5" name="modern_phonology" value="韻尾" onChange={(e) => set_modern_phonology(e.value)} checked={modern_phonology === '韻尾'} />
                      <label htmlFor="modern_phonology5">韻尾</label>
                  </div>
                  <div className="field-radiobutton">
                      <RadioButton inputId="modern_phonology6" name="modern_phonology" value="聲調" onChange={(e) => set_modern_phonology(e.value)} checked={modern_phonology === '聲調'} />
                      <label htmlFor="modern_phonology6">聲調</label>
                  </div>
                </div>
              </div>
          </div>
      </div>

      <div className="card">
        <div className="flex justify-content-end">
          <Button className="ml-3" label="查詢" onClick={queryEvolution} />
        </div>
        <button onClick={() => makeRequest()}>Make Request</button>
      </div>

      <Toast ref={toast} />

      <code className={styles.code}>
        <div>
          <b>Status Code: </b>
          {response?.status || 'None'}
        </div>
        <div>
          <b>Request Limit: </b>
          {response?.limit || 'None'}
        </div>
        <div>
          <b>Remaining Requests: </b>
          {response?.remaining || 'None'}
        </div>
        <div>
          <b>Body: </b>
          {JSON.stringify(response?.body) || 'None'}
        </div>
      </code>
        
    </Layout>
  )
}


const treetablenodes = [
    {
        "key": "0",
        "label": "南寧白話",
        "data": "Documents Folder",
        "icon": "pi pi-fw pi-folder",
        "children": [
          { "key": "0-0", "label": "1994年謝建猷《南寧白話同音字彙》", "data": "Work Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-1", "label": "1997年楊煥典《南寧話音檔》", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-2", "label": "1998年楊煥典主編《廣西通誌·漢語方言誌》", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-3", "label": "2003年侯精一《現代漢語方言音庫(字庫)》", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-4", "label": "2007年謝建猷《廣西漢語方言研究》", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-5", "label": "2008年林亦、覃鳳餘《廣西南寧白話研究》", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-6", "label": "2018年滕祖愛《南寧市與桂平市粵方言比較研究》", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-7", "label": "2018年Leimaau《南寧話審音表》(本站提供)", "data": "Home Folder", "icon": "pi pi-fw pi-book"},
          { "key": "0-8", "label": "2021年Leimaau《單字音零散資料匯總》(本站提供)", "data": "Home Folder", "icon": "pi pi-fw pi-book"}
        ]
    },
    {
        "key": "1",
        "label": "南寧平話",
        "data": "Events Folder",
        "icon": "pi pi-fw pi-folder",
        "children": [
          { "key": "1-0", "label": "1998年楊煥典主編《廣西通誌·漢語方言誌》", "icon": "pi pi-fw pi-book", "data": "Meeting" },
          { "key": "1-1", "label": "2000年李連進《平話音韻研究》", "icon": "pi pi-fw pi-book", "data": "Product Launch" },
          { "key": "1-2", "label": "2017年教育部《漢語方言用字規範》", "icon": "pi pi-fw pi-book", "data": "Report Review" },
          { "key": "1-3", "label": "2017年詹伯慧、張振興《漢語方言學大詞典》", "icon": "pi pi-fw pi-book", "data": "Report Review" },
          { "key": "1-4", "label": "2018年Leimaau《南寧話審音表》(本站提供)", "icon": "pi pi-fw pi-book", "data": "Report Review" },
          { "key": "1-5", "label": "2021年Leimaau《單字音零散資料匯總》(本站提供)", "icon": "pi pi-fw pi-book", "data": "Report Review" }
        ]
    }
]

