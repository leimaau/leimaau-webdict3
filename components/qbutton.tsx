import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BasicDialog from '../components/basicDialog'

export default function QButton({search, isConnected, radioName, clearFunc, type}) {

  const router = useRouter()
  const [valueFind, setValueFind] = useState(search)
  const [radioFind, setradioFind] = useState(radioName)
  const [loading, setLoading] = useState(false)

  const categories = [{name: type+'/拼音', key: 'A'}, {name: '釋義', key: 'B'}, {name: '附註', key: 'C'}]
  const selValue = (radioFind=='A') ? 0 : ((radioFind=='B') ? 1 : (radioFind=='C') ? 2 : 1)
  const [selectedCategory, setSelectedCategory] = useState(categories[selValue])

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))
    return () => {
      router.events.off('routeChangeStart', () => setLoading(true))
      router.events.off('routeChangeComplete', () => setLoading(false))
      router.events.off('routeChangeError', () => setLoading(false))
    }
  }, [router.events])

  const querySubmit = () => {
    clearFunc()
    if (!valueFind || valueFind=='*') {
      return false
    } else {
      let pathstr = (type=='單字' ? '/search/' : (type=='詞彙' ? '/phrase/' : '/grammar/'))
      router.push(pathstr + valueFind.replace(/[\s|\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,'') + '?queryType=' + radioFind)
    }
  }

  return (
    <div>
        {(isConnected && !loading) ? (
          <div>
            <div className="p-inputgroup">
              <InputText value={valueFind} onChange={(e) => setValueFind(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') querySubmit()}} placeholder="Keyword"/>
              <Button label="查詢" icon="pi pi-search" className="p-button" onClick={()=>{querySubmit()}}/>
            </div>
            <div className="formgroup-inline pt-2">
            <div className="field-radiobutton pt-2">
            {categories.map((category) => {
                return (
                    <div key={category.key}>
                        <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => {setSelectedCategory(e.value);setradioFind(e.value.key)}} checked={selectedCategory.key === category.key} />
                        <label className="mr-2 ml-1" htmlFor={category.key}>{category.name}</label>
                    </div>
                )
            })
            }</div>
            <BasicDialog rowDataFlag="1" clearFunc={clearFunc} type={type}/><span className='ml-2'></span><BasicDialog rowDataFlag="2" clearFunc={clearFunc} type={type}/>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-inputgroup">
              <InputText value={valueFind} onChange={(e) => setValueFind(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') querySubmit()}} placeholder="Keyword"/>
              <Button label="查詢" icon="pi pi-search" className="p-button" onClick={()=>{querySubmit()}} loading />
            </div>
            <div className="formgroup-inline pt-2">
            <div className="field-radiobutton pt-2">
            {categories.map((category) => {
                return (
                    <div key={category.key}>
                        <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => {setSelectedCategory(e.value);setradioFind(e.value.key)}} checked={selectedCategory.key === category.key} />
                        <label className="mr-2 ml-1" htmlFor={category.key}>{category.name}</label>
                    </div>
                )
            })
            }</div>
            <BasicDialog rowDataFlag="1" clearFunc={clearFunc} type={type}/><span className='ml-2'></span><BasicDialog rowDataFlag="2" clearFunc={clearFunc} type={type}/>
            </div>
          </div>
        )}
    </div>
  )
}
  