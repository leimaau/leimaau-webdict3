import React, { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Layout from '../../components/layout'

export default function signarticle() {
  const [value1, setValue1] = useState('莫說青山多障礙\n風也急風也勁\n白雲過山峰也可傳情\n莫說水中多變幻\n水也清水也靜\n柔情似水愛共永\n未怕罡風吹散了熱愛\n萬水千山總是情\n聚散也有天註定\n不怨天不怨命\n但求有山水共作證')
  const [value2, setValue2] = useState('')
  const [item, setItem] = useState('0')
  const [selectedItem1, setSelectedItem1] = useState<any>({ name: '南寧白話-林亦、覃鳳餘《廣西南寧白話研究》版', code: 'nIPA' })
  const [selectedItem2, setSelectedItem2] = useState<any>({ name: '調值不上標', code: 'noUp' })
  const [selectedItem3, setSelectedItem3] = useState<any>({ name: '南寧白話', code: 'nnDict' })
  const [selectedItem4, setSelectedItem4] = useState<any>({ name: '按字內嵌', code: 'updown' })
  const [selectedItem5, setSelectedItem5] = useState<any>({ name: '粵拼', code: 'jyutping' })
  const [checked, setChecked] = useState<boolean>(false)
  const [checked2, setChecked2] = useState<boolean>(true)
  const [checked3, setChecked3] = useState<boolean>(true)
  const toast = useRef(null)
  const [copied, setCopied] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const setInputTextarea = (e: string) => {
    if (e=='0') {
      setValue1('莫說青山多障礙\n風也急風也勁\n白雲過山峰也可傳情\n莫說水中多變幻\n水也清水也靜\n柔情似水愛共永\n未怕罡風吹散了熱愛\n萬水千山總是情\n聚散也有天註定\n不怨天不怨命\n但求有山水共作證')
    } else {
      setValue1('莫说青山多障碍\n风也急风也劲\n白云过山峰也可传情\n莫说水中多变幻\n水也清水也静\n柔情似水爱共永\n未怕罡风吹散了热爱\n万水千山总是情\n聚散也有天注定\n不怨天不怨命\n但求有山水共作证')
    }
  }

  const items = (selectedItem3.code == 'nnDict') ? [
    { name: '南寧白話-林亦、覃鳳餘《廣西南寧白話研究》版', code: 'nIPA' },
    { name: '南寧白話-楊煥典主編《廣西通誌·漢語方言誌》版', code: 'nIPA2' },
    { name: '南寧白話-梁振仕《〈切韻〉系統與南寧音系》版', code: 'nIPA3' },
    { name: '南寧白話-唐七元《廣西漢語方言概要》版', code: 'nIPA4' }
  ] : [
    { name: '南寧平話-楊煥典主編《廣西通誌·漢語方言誌》版', code: 'tIPA' },
    { name: '南寧平話-李榮主編《南寧平話詞典》版', code: 'tIPA2' },
    { name: '南寧平話-余瑾《廣西平話研究》版', code: 'tIPA3' },
    { name: '南寧平話-唐七元《廣西漢語方言概要》版', code: 'tIPA4' }
  ]

  const items2 = [
    { name: '調值不上標', code: 'noUp' },
    { name: '調值上標', code: 'Up' },
    { name: '調型豎線', code: 'toneLine' }
  ]

  const items3 = [
    { name: '南寧白話', code: 'nnDict' },
    { name: '南寧平話', code: 'nntDict' }
  ]

  const items4 = [
    { name: '按字內嵌', code: 'updown' },
    { name: '按行內嵌', code: 'lineupdown' },
    { name: '分行', code: 'twolines' },
    { name: '平行', code: 'parallel' },
    { name: '直接替換', code: 'replace' }
  ]

  const items5 =  (selectedItem4.code == 'twolines' || selectedItem4.code == 'parallel') ? [
    { name: '粵拼', code: 'jyutping' },
    { name: 'IPA', code: 'ipa' },
    { name: '粵拼和IPA', code: 'jyutping_ipa' },
    { name: 'IPA和粵拼', code: 'ipa_jyutping' }
  ] : [
    { name: '粵拼', code: 'jyutping' },
    { name: 'IPA', code: 'ipa' }
  ]

  const makeSegment = async (text: string | string[], signResult_format: string, signText_type: string, signResult_type: string, signResult_way: string, signResult_IPA: string, signIPA_version: string, checked: boolean, checked2: boolean, checked3: boolean) => {
    const res = await fetch('/api/segment/'+text+'?signResult_format='+signResult_format+'&signText_type='+signText_type+'&signResult_type='+signResult_type+'&signResult_way='+signResult_way+'&signResult_IPA='+signResult_IPA+'&signIPA_version='+signIPA_version+'&checkedStr='+checked+'&checkedStr2='+checked2+'&checkedStr3='+checked3)
    .then(res => res.json())
    setValue2(res.text)
  }

  const signArticle = () => {
    if (value1.length > 10000) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'禁止超過一萬字！', life: 3000})
      return false
    }
    
    let signResult_format = selectedItem4.code
    let signText_type = item=='0' ? 'trad' : 'simp'
    let signResult_type = selectedItem3.code
    let signResult_way = selectedItem5.code
    let signResult_IPA = selectedItem2.code
    let signIPA_version = selectedItem1.code

    makeSegment(value1.replaceAll('\n','_newline'), signResult_format, signText_type, signResult_type, signResult_way, signResult_IPA, signIPA_version, checked, checked2, checked3)

  }

  useEffect(() => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }, [copied])

  const handleCopy = () => {
    if (copied && activeIndex==0) toast.current.show({severity:'success', summary: 'Success Message', detail:'顯示格式複製成功！', life: 3000})
    if (copied && activeIndex==1) toast.current.show({severity:'success', summary: 'Success Message', detail:'HTML格式複製成功！', life: 3000})
  }

  useEffect(() => {
    if (selectedItem3.code == 'nnDict') {
      setSelectedItem1({ name: '南寧白話-林亦、覃鳳餘《廣西南寧白話研究》版', code: 'nIPA' })
    } else {
      setSelectedItem1({ name: '南寧平話-楊煥典主編《廣西通誌·漢語方言誌》版', code: 'tIPA' })
    }
  }, [selectedItem3])

  useEffect(() => {
    if (selectedItem5.code == "ipa_jyutping" || selectedItem5.code == "jyutping_ipa") setSelectedItem5({ name: '粵拼', code: 'jyutping' })
  }, [selectedItem4])

  const selectedItemsTemplate = (option, props) => {
    if (option) {
        return (
            <div>
                <div className="w-15rem md:w-max white-space-nowrap overflow-hidden text-overflow-ellipsis">{option.name}</div>
            </div>
        )
    }

    return (
        <span>
            {props.placeholder}
        </span>
    )
  }

  return (
    <Layout home>
      <div>
        <div className="card">
          <h2>在線標註</h2>
          <div className="formgroup-inline flex flex-column md:flex-row align-items-left">
            <div className="field-radiobutton">
              輸入文本：
              <RadioButton inputId="item1" name="item" value="0" onChange={(e) => {setItem(e.value);setInputTextarea('0')}} checked={item === '0'} />
              <label className="mr-0 ml-1 mr-2" htmlFor="item1">繁體</label>
              <RadioButton inputId="item2" name="item" value="1" onChange={(e) => {setItem(e.value);setInputTextarea('1')}} checked={item === '1'} />
              <label className="mr-0 ml-1 mr-2" htmlFor="item2">簡體</label>
            </div>
            <div className="field-checkbox">
              <Checkbox inputId="output_useWordSeg" checked={checked2} onChange={e => setChecked2(e.checked)} />
              <label htmlFor="output_useWordSeg">啓用分詞系統和審詞表</label>
              <Checkbox inputId="output_useFilter" checked={checked3} onChange={e => setChecked3(e.checked)} />
              <label htmlFor="output_useFilter">過濾罕用音和口語音</label>
            </div>
          </div>
          <InputTextarea value={value1} onChange={(e) => setValue1(e.target.value)} rows={12} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card mt-2">
          <div className="formgroup-inline flex flex-column md:flex-row align-items-left">
            <div className="field-checkbox">
              <span>輸出結果：</span>
              <Dropdown value={selectedItem3} options={items3} onChange={(e) => setSelectedItem3(e.value)} optionLabel="name" placeholder="Select a Item" />
            </div>
            <div className="field-checkbox">
              <span>標註格式：</span>
              <Dropdown value={selectedItem4} options={items4} onChange={(e) => setSelectedItem4(e.value)} optionLabel="name" placeholder="Select a Item" />
            </div>
            <div className="field-checkbox">
              <span>標註方式：</span>
              <Dropdown value={selectedItem5} options={items5} onChange={(e) => setSelectedItem5(e.value)} optionLabel="name" placeholder="Select a Item" />
            </div>
          </div>
          <div className={ selectedItem5.code=='jyutping' ? 'hidden' : 'formgroup-inline flex flex-column md:flex-row align-items-left'}>
            <span className="mt-3">輸出 IPA 版本：</span>
            <div className="field-checkbox m-1">
              <Dropdown value={selectedItem1} options={items} valueTemplate={selectedItemsTemplate} onChange={(e) => setSelectedItem1(e.value)} optionLabel="name" placeholder="Select a Item" />
            </div>
            <div className="field-checkbox m-1">
              <Dropdown value={selectedItem2} options={items2} onChange={(e) => setSelectedItem2(e.value)} optionLabel="name" placeholder="Select a Item" />
              <Checkbox className="ml-2" inputId="isSymbols" checked={checked} onChange={e => setChecked(e.checked)} />
              <label htmlFor="isSymbols">帶附加符</label>
            </div>
          </div>
          <TabView className="overflow-auto" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              <TabPanel header="顯示格式">
                  <div dangerouslySetInnerHTML={{ __html: value2 }} />
              </TabPanel>
              <TabPanel header="HTML格式">
                  <InputTextarea value={value2} onChange={(e) => {setValue2(e.target.value);setCopied(false)}} rows={12} style={{width: '-webkit-fill-available'}} />
              </TabPanel>
          </TabView>
        </div>
        <div className="card noteDiv">
          <span>※ 標註結果最好經過人工校對</span>
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
          <Button label="標註" className="p-button-sm m-2" onClick={signArticle}/>
        </div>
      </div>
      <Toast ref={toast} />
    </Layout>
  )
}
