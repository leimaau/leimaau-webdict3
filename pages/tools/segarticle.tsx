import React, { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Layout from '../../components/layout'

export default function segarticle() {
  const [value1, setValue1] = useState("我們來自泥潭\nWe come from the mire\n我們在地獄高歌\nWe're singing in hell\n我們渴望權力\nWe yearn for rights\n我們充滿野心\nWe are full of ambition\n我們強大冷靜\nWe are strong and calm\n我們優雅自持\nWe hold ourselves gracefull\n我們從不後悔\nWe never regret\n我們是永遠高貴純潔的\nWe are always noble and pure\n斯萊特林\nSlytherin ")
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [checked, setChecked] = useState<boolean>(true)
  const [checked2, setChecked2] = useState<boolean>(false)
  const [checked3, setChecked3] = useState<boolean>(false)
  const toast = useRef(null)
  const [copied, setCopied] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)


  const makeSegment = async (text: string | string[], signText_type: string, checked: boolean, checked2: boolean, checked3: boolean) => {
    const res = await fetch('/api/segment/'+text+'?signText_type='+signText_type+'&checkedStr='+checked+'&checkedStr2='+checked2+'&checkedStr3='+checked3)
    .then(res => res.json())
    setValue2(res.text)
  }

  const getSegment = async (text: string | string[], signText_type: string, checked: boolean, checked2: boolean, checked3: boolean) => {
    const res = await fetch('/api/segment/'+text+'?signText_type='+signText_type+'&checkedStr='+checked+'&checkedStr2='+checked2+'&checkedStr3='+checked3)
    .then(res => res.json())
    setValue3(res.text)
  }

  const signArticle = () => {
    if (value1.length > 10000) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'禁止超過一萬字！', life: 3000})
      return false
    }
    makeSegment(value1.replaceAll('\n','_newline'), 'trad_simp', checked, checked2, checked3)
    getSegment(value1.replaceAll('\n','_newline'), 'Array', checked, checked2, checked3)
  }

  useEffect(() => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }, [copied])

  const handleCopy = () => {
    if (copied && activeIndex==0) toast.current.show({severity:'success', summary: 'Success Message', detail:'顯示格式複製成功！', life: 3000})
    if (copied && activeIndex==1) toast.current.show({severity:'success', summary: 'Success Message', detail:'HTML格式複製成功！', life: 3000})
    if (copied && activeIndex==2) toast.current.show({severity:'success', summary: 'Success Message', detail:'數組格式複製成功！', life: 3000})
  }


  return (
    <Layout home>
      <div>
        <div className="card">
          <h2>在線分詞</h2>
          <div className="formgroup-inline flex flex-column md:flex-row align-items-left">
            <div className="field-radiobutton">
              輸入文本：
            </div>
          </div>
          <InputTextarea value={value1} onChange={(e) => setValue1(e.target.value)} rows={12} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card mt-2">
          <div className="formgroup-inline flex flex-column md:flex-row align-items-left">
          <div className="field-checkbox">
              <span>輸出結果：</span>
            </div>
            <div className="field-checkbox">
              <Checkbox inputId="output_useFilter1" checked={checked} onChange={e => setChecked(e.checked)} />
              <label htmlFor="output_useFilter1">數組格式不返回詞性</label>
            </div>
            <div className="field-checkbox">
              <Checkbox inputId="output_useFilter2" checked={checked2} onChange={e => setChecked2(e.checked)} />
              <label htmlFor="output_useFilter2">去除標點符號</label>
            </div>
            <div className="field-checkbox">
              <Checkbox inputId="output_useFilter3" checked={checked3} onChange={e => setChecked3(e.checked)} />
              <label htmlFor="output_useFilter3">去除停止符</label>
            </div>
          </div>
          <TabView className="overflow-auto" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              <TabPanel header="顯示格式">
                  <div dangerouslySetInnerHTML={{ __html: value2 }} />
              </TabPanel>
              <TabPanel header="HTML格式">
                  <InputTextarea value={value2} onChange={(e) => {setValue2(e.target.value);setCopied(false)}} rows={12} style={{width: '-webkit-fill-available'}} />
              </TabPanel>
              <TabPanel header="數組格式">
                  <InputTextarea value={value3} onChange={(e) => {setValue3(e.target.value);setCopied(false)}} rows={12} style={{width: '-webkit-fill-available'}} />
              </TabPanel>
          </TabView>
        </div>
        <div className="card noteDiv">
          <span>※ 本功能使用開源的<a target="_blank" href="https://github.com/leizongmin/node-segment">中文分詞模塊</a>，本站添加適合繁體的新分詞詞典</span><br/>
          <span>※ 詞性具體參攷<a target="_blank" href="https://github.com/leizongmin/node-segment/blob/master/lib/POSTAG.js">此處源碼</a>給的定義</span><br/>
          <span>※ 請勿對較長且無任何標點符號的文本分詞</span>
        </div>
        <style jsx>{`
          div .noteDiv {
            max-width: 820px
          }
        `}</style>
        <div className="card flex justify-content-end">
          <Button label="清空" className="p-button-raised p-button-info p-button-text p-button-sm m-2" onClick={() => {setValue1('');setValue2('')}} />
          <CopyToClipboard text={(activeIndex==0) ? value2.replaceAll('<br>','\n').replaceAll('<ruby>','').replaceAll('</ruby>','').replaceAll('<rp>','').replaceAll('</rp>','').replaceAll('<rt>','').replaceAll('</rt>','') : value2} onCopy={() => setCopied(true)}>
            <Button label="複製" className="p-button-info p-button-sm m-2" onClick={() => {setCopied(true);handleCopy()}} />
          </CopyToClipboard>
          <Button label="分詞" className="p-button-sm m-2" onClick={signArticle}/>
        </div>
      </div>
      <Toast ref={toast} />
    </Layout>
  )
}
