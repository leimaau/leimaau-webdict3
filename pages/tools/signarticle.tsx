import React, { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { jyutping_to_ipa } from './jyutping_ipa'
import Layout from '../../components/layout'
import { nnDict } from '../../lib/markdata/nnDict'
import { nntDict } from '../../lib/markdata/nntDict'

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
    { name: '南寧白話-梁振仕《〈切韻〉系統與南寧音系》版', code: 'nIPA3' }
  ] : [
    { name: '南寧平話-楊煥典主編《廣西通誌·漢語方言誌》版', code: 'tIPA' },
    { name: '南寧平話-李榮主編《南寧平話詞典》版', code: 'tIPA2' },
    { name: '南寧平話-余瑾《廣西平話研究》版', code: 'tIPA3' }
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

  const signArticle = () => {
    if (value1.length > 10000) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'禁止超過一萬字！', life: 3000})
      return false
    }

    const outputText = []
    let signResult_format = selectedItem4.code
    let signText_type = item=='0' ? 'trad' : 'simp'
    let signResult_type = selectedItem3.code
    let signResult_way = selectedItem5.code
    let signResult_IPA = selectedItem2.code
    let signIPA_version = selectedItem1.code
    
    for (let lines of value1.split('\n')) {
      if (signResult_format == 'updown') { // 按字內嵌
        let outputLine = [];
        for (let txtStr of lines) {
          outputLine.push(`<ruby>${queryJyutpingPhrase(txtStr, signText_type, signResult_type, (signResult_way == 'jyutping' || signResult_way == 'jyutping_ipa') ? 'jyutping' : 'ipa', signResult_format, signResult_IPA, signIPA_version, false)}</ruby>`);
        }
        outputText.push(`${outputLine.join('')}<br>`);
      } else if (signResult_format == 'lineupdown') { // 按行內嵌
        let outputLine1 = [], outputLine3 = [];
        for (let txtStr of lines) {
          outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, (signResult_way == 'jyutping' || signResult_way == 'jyutping_ipa') ? 'jyutping' : 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
          outputLine3.push(txtStr);
        }
        outputText.push(`<ruby>${outputLine3.join('')}<rp>(</rp><rt>${outputLine1.join(' ')}</rt><rp>)</rp></ruby><br>`);
      } else if (signResult_format == 'twolines' || signResult_format == 'parallel') { // 分行或平行
        let outputLine1 = [], outputLine2 = [], outputLine3 = [];
        for (let txtStr of lines) {
          if (signResult_way == 'jyutping') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'jyutping', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          } else if (signResult_way == 'ipa') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          } else if (signResult_way == 'jyutping_ipa') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'jyutping', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine2.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          } else if (signResult_way == 'ipa_jyutping') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine2.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'jyutping', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          }
        }
        if (signResult_way == 'jyutping' || signResult_way == 'ipa'){
          if (signResult_format == 'twolines') {  // 分行
            outputText.push(`${outputLine1.join(' ')}<br>${outputLine3.join('')}<br>`);
          } else {  // 平行
            outputText.push(`${outputLine3.join('')} || ${outputLine1.join(' ')}<br>`);
          }
        } else {
          if (signResult_format == 'twolines') {  // 分行
            outputText.push(`${outputLine1.join(' ')}<br>${outputLine2.join(' ')}<br>${outputLine3.join('')}<br>`);
          } else {  // 平行
            outputText.push(`${outputLine3.join('')} || ${outputLine1.join(' ')} || ${outputLine2.join(' ')}<br>`);
          }
        }
      } else if (signResult_format == 'replace') { // 直接替換
        let outputLine = [];
        for (let txtStr of lines) {
          outputLine.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, (signResult_way == 'jyutping' || signResult_way == 'jyutping_ipa') ? 'jyutping' : 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
        }
        outputText.push(`${outputLine.join(' ')}<br>`);
      }
    }

    setValue2(outputText.join(''))
  }

  // 【詞彙】查詢粵拼或IPA函數
  const queryJyutpingPhrase = (txtStr, trad_simp, tabName, jyutping_ipa, signResult_format, signResult_IPA, signIPA_version, keep_symbol = true) => {
    let res = (tabName=='nnDict') ? nnDict.filter(item => item[trad_simp] == txtStr) : nntDict.filter(item => item[trad_simp] == txtStr);
    let resJ =[];
    if (res.length == 1 && txtStr.length > 1 && checked2) { // 詞典有一個數據並且爲詞彙
      for(let i in txtStr.split('')){
        let charJp = res[0]['jyutping'].split(' ')[i];
        if (signResult_format == 'updown') { // 按字內嵌時 中文字後帶 '</rt><rp>)</rp>'，拼音或ipa後帶 '</rt><rp>)</rp>'，return時合併起來
          resJ.push(txtStr.split('')[i] + '<rp>(</rp><rt>');
          resJ.push((jyutping_ipa == 'jyutping') ? charJp + '</rt><rp>)</rp>' : jyutping_to_ipa(charJp, signIPA_version, signResult_IPA, checked) + '</rt><rp>)</rp>');
        } else {
          resJ.push((jyutping_ipa == 'jyutping') ? charJp : jyutping_to_ipa(charJp, signIPA_version, signResult_IPA, checked));
        }
      }
    } else if (res.length > 1 && txtStr.length > 1 && checked2) { // 詞典有多個數據並且爲詞彙
      for(let i in txtStr.split('')){
        let tempJp = [], tempIPA = [];
        for (let j of res) {
          tempJp.push(j.jyutping.split(' ')[i]);
          tempIPA.push(jyutping_to_ipa(j.jyutping, signIPA_version, signResult_IPA, checked).split(' ')[i]);
        }
        if (signResult_format == 'updown') { // 按字內嵌時 中文字後帶 '</rt><rp>)</rp>'，拼音或ipa後帶 '</rt><rp>)</rp>'，return時合併起來
          resJ.push(txtStr.split('')[i] + '<rp>(</rp><rt>');
          resJ.push((jyutping_ipa == 'jyutping') ? [...new Set(tempJp)].join('/') + '</rt><rp>)</rp>' : [...new Set(tempIPA)].join('/') + '</rt><rp>)</rp>');
        } else {
          resJ.push((jyutping_ipa == 'jyutping') ? [...new Set(tempJp)].join('/') : [...new Set(tempIPA)].join('/'));
        }
      }
    } else { // 詞典無數據或有多個讀音或爲單字
      for(let i of txtStr.split('')){
        if (signResult_format == 'updown') {
          resJ.push(i + '<rp>(</rp><rt>');
          resJ.push(queryJyutping(i, trad_simp, tabName, jyutping_ipa, signResult_IPA, signIPA_version, keep_symbol) + '</rt><rp>)</rp>');
        } else {
          resJ.push(queryJyutping(i, trad_simp, tabName, jyutping_ipa, signResult_IPA, signIPA_version, keep_symbol));
        }
      }
    }
    return resJ.join((signResult_format == 'updown') ? '' : ',');
  }

  // 【單字】查詢粵拼或IPA函數
  const queryJyutping = (txtStr, trad_simp, tabName, jyutping_ipa, signResult_IPA, signIPA_version, keep_symbol = true) => {
    let res = [];
    if (checked3) {
      res = (tabName=='nnDict') ? nnDict.filter(item => item[trad_simp] == txtStr && item['flag'] == '0') : nntDict.filter(item => item[trad_simp] == txtStr && item['flag'] == '0');
    } else {
      res = (tabName=='nnDict') ? nnDict.filter(item => item[trad_simp] == txtStr) : nntDict.filter(item => item[trad_simp] == txtStr);
    }
    if ( !(/[^\u4e00-\u9fa5]/.test(txtStr)) || (res.length > 0) ) { // 判斷是否中文或字典有數據
      if(res.length != 0){
        if (res.length == 1){ // 只有一種讀音
          return (jyutping_ipa == 'jyutping') ? res[0]['jyutping'] : jyutping_to_ipa(res[0]['jyutping'], signIPA_version, signResult_IPA, checked);
        } else {
          let char_jyutping = [], char_ipa = [];
          for (let i of res){
            char_jyutping.push(i.jyutping);
            char_ipa.push(jyutping_to_ipa(i.jyutping, signIPA_version, signResult_IPA, checked));
          }
          return (jyutping_ipa == 'jyutping') ? [...new Set(char_jyutping)].join('/') : [...new Set(char_ipa)].join('/');
        }
      } else { // 無讀音
        return '　'; // 全角空格，會被當成一個中文
      }
    } else { // 非中文字符
      if(keep_symbol) {
        return txtStr;
      } else {
        return '';
      }
    }
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
              <label htmlFor="item1">繁體</label>
              <RadioButton inputId="item2" name="item" value="1" onChange={(e) => {setItem(e.value);setInputTextarea('1')}} checked={item === '1'} />
              <label htmlFor="item2">簡體</label>
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
          <span>※ 標註結果最好經過人工校對</span><br/>
          <span>※ 分詞系統尚未完善，開發中</span>
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
