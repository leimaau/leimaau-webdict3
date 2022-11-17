import React, { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Layout from '../../components/layout'

export default function transform() {
  const [value1, setValue1] = useState('kwaat6')
  const [value2, setValue2] = useState('')
  const toast = useRef(null)
  const [copied, setCopied] = useState(false)

  const soundLenovoFun = () => {
    if (value1.length === 0) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'請輸入需要聯想的讀音！', life: 3000})
      return false
    } else if (value1.length > 10) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'請輸入一個正確音節！', life: 3000})
      return false
    }

    const outputText = [], outputText2 = []

    outputText.push(value1)
    outputText2.push(value1)
    if(/gw/.test(value1)) outputText.push(value1.replace(/gw/g,"kw"))
    if(/kw/.test(value1)) outputText.push(value1.replace(/kw/g,"gw"))
    if(/^g/.test(value1)) outputText.push(value1.replace(/^g/g,"k"))
    if(/^k/.test(value1)) outputText.push(value1.replace(/^k/g,"g"))
    if(/^z/.test(value1)) outputText.push(value1.replace(/^z/g,"c"))
    if(/^c/.test(value1)) outputText.push(value1.replace(/^c/g,"z"))
    if(/^d/.test(value1)) outputText.push(value1.replace(/^d/g,"t"))
    if(/^t/.test(value1)) outputText.push(value1.replace(/^t/g,"d"))
    if(/^b/.test(value1)) outputText.push(value1.replace(/^b/g,"p"))
    if(/^p/.test(value1)) outputText.push(value1.replace(/^p/g,"b"))

    for (let i of outputText) {	
      if(/aa/.test(i)) outputText2.push(i.replace(/aa/g,"a"))
      if(/aa/.test(i)) outputText2.push(i.replace(/aa/g,"e"))
    }
    
    for (let i of outputText) {	
      if(/a/.test(i)) outputText2.push(i.replace(/a/g,"e").replace(/ee/g,"e"))
      if(/a/.test(i)) outputText2.push(i.replace(/a/g,"aa").replace(/aaaa/g,"aa"))
    }
    
    for (let i of outputText) {
      if(/eng/.test(i)) outputText2.push(i.replace(/eng/g,"ing"))
      if(/e([umnptk])/.test(i)) outputText2.push(i.replace(/e([umnptk])/g,"aa$1"))
      if(/e([umnptk])/.test(i)) outputText2.push(i.replace(/e([umnptk])/g,"a$1"))
      if(/e([umnptk])/.test(i)) outputText2.push(i.replace(/e([umnptk])/g,"i$1"))
      if(/e(\d)/.test(i)) outputText2.push(i.replace(/e(\d)/g,"aa$1"))
      if(/e(\d)/.test(i)) outputText2.push(i.replace(/e(\d)/g,"a$1"))
      if(/e(\d)/.test(i)) outputText2.push(i.replace(/e(\d)/g,"i$1"))
    }
    
    for (let i of outputText) {
      if(/ing/.test(i)) outputText2.push(i.replace(/ing/g,"eng"))
      if(/i([umnptk])/.test(i)) outputText2.push(i.replace(/i([umnptk])/g,"e$1"))
      if(/([^aeuo])i(\d)/.test(i)) outputText2.push(i.replace(/([^aeuo])i(\d)/g,"$1e$2"))	
    }

    for (let i of outputText2) {
      if(/^h/.test(i)) outputText.push(i.replace(/^h/g,"k"))
      if(/^k/.test(i)) outputText.push(i.replace(/^k/g,"h"))
    }
    
    for (let i of outputText2) { 
      outputText.push(i)
    }

    setValue2(Array.from(new Set(outputText)).join('\n'))
  }

  useEffect(() => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }, [copied])

  const handleCopy = () => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }

  return (
    <Layout home>
      <div>
        <div className="card">
          <h2>讀音聯想</h2>
          <div className="formgroup-inline">
            <div className="field-radiobutton">
              輸入讀音：
            </div>
          </div>
          <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card">
          <InputTextarea className="mt-2" value={value2} onChange={(e) => {setValue2(e.target.value);setCopied(false)}} rows={12} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card noteDiv">
          <span>※ 讀音聯想器用於在攷究有音無字的音節時，爲猜想其本字提供方便</span><br/>
          <span>※ 聯想原則：送氣與不送氣、長元音與短元音、文白異讀、曉母與溪母互通</span>
        </div>
        <style jsx>{`
          div .noteDiv {
            max-width: 820px
          }
        `}</style>
        <div className="card flex justify-content-end">
          <Button label="清空" className="p-button-raised p-button-info p-button-text p-button-sm m-2" onClick={() => {setValue1('');setValue2('')}} />
          <CopyToClipboard text={value2} onCopy={() => setCopied(true)}>
            <Button label="複製" className="p-button-info p-button-sm m-2" onClick={() => {setCopied(true);handleCopy()}} />
          </CopyToClipboard>
          <Button label="聯想" className="p-button-sm m-2" onClick={soundLenovoFun}/>
        </div>
      </div>
      <Toast ref={toast} />
    </Layout>
  )
}

