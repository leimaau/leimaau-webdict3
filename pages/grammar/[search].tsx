import React, { useEffect, useRef } from 'react'
import { getTabPhrase } from '../../lib/dao'
import 'default-passive-events'
import { TabView, TabPanel } from 'primereact/tabview'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'
import { Messages } from 'primereact/messages'
import Layout from '../../components/layout'
import QButton from '../../components/qbutton'
import FastLink from '../../components/fastLink'

export default function Grammar({ isShort, isConnected, tabDataList, reqWord, reqType }) {

  const msgs_db = useRef(null)
  const msgs_islong = useRef(null)
  
  const clearFunc = () => {
    if (msgs_db.current!==null) msgs_db.current.clear()
    if (msgs_islong.current!==null) msgs_islong.current.clear()
  }

  useEffect(() => {
    if(!isConnected) msgs_db.current.show({ severity: 'error', summary: '', detail: '數據庫連接失敗，請刷新或聯繫站長', sticky: true })
    if(!isShort) msgs_islong.current.show({ severity: 'error', summary: '', detail: '數據量超過1000條，請縮小查詢範圍', sticky: true })
  }, [isConnected, isShort])


  return (
    <Layout home>
      
    <QButton search={reqWord} isConnected={isConnected} radioName={reqType} clearFunc={clearFunc} type="詞彙"/>

    {isConnected ? (
      <span></span>
    ) : (
      <Messages ref={msgs_db}></Messages>
    )}

    {isShort ? (
      <span></span>
    ) : (
      <Messages ref={msgs_islong}></Messages>
    )}

    <TabView className={(reqType=='B'||reqType=='C'||reqType=='D'||reqType=='F1'||reqType=='F2') ? 'picTabView hidden overflow-auto': 'picTabView overflow-auto'}>
        <TabPanel header="詞雲圖">
            545
        </TabPanel>
    </TabView>

    <h2 className={tabDataList[0].length==0 ? 'hidden': ''}>南寧白話<small>市區</small></h2>
    <div className={tabDataList[0].length==0 ? 'hidden': ''}>
        <Divider align="left" type="dashed">
            <span className="p-tag p-tag-info"><i className="pi pi-book"></i>2021年Leimaau《詞彙零散資料匯總》(本站提供)</span>
        </Divider>
        {tabDataList[0].map(({ _id,trad,simp,ipa_s,ipa_t,jyutping,sour,expl,note }) => (
          <div key={_id}>
            <Divider align="left" type="dashed"/>
            <Card title={trad+'('+simp+')'} subTitle={jyutping+' ['+ipa_t+']'} >
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>粵拼：</strong>{jyutping}</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>統一IPA：</strong>[{ipa_t}]</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>原文IPA：</strong>[{ipa_s}]</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>來源：</strong>{sour}</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>釋義：</strong>{expl}</p>
                <p className={note==null ? 'hidden' : "m-0"} style={{lineHeight: '1.5'}}><strong>附註：</strong>{note}</p>
            </Card>
          </div>
        ))}
    </div>

    <h2 className={tabDataList[1].length==0 ? 'hidden': ''}>南寧平話<small>亭子</small></h2>
    <div className={tabDataList[1].length==0 ? 'hidden': ''}>
        <Divider align="left" type="dashed">
            <span className="p-tag p-tag-info"><i className="pi pi-book"></i>2021年Leimaau《詞彙零散資料匯總》(本站提供)</span>
        </Divider>
        {tabDataList[1].map(({ _id,trad,simp,ipa_s,ipa_t,jyutping,sour,expl,note }) => (
          <div key={_id}>
            <Divider align="left" type="dashed"/>
            <Card title={trad+'('+simp+')'} subTitle={jyutping+' ['+ipa_t+']'} >
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>粵拼：</strong>{jyutping}</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>統一IPA：</strong>[{ipa_t}]</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>原文IPA：</strong>[{ipa_s}]</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>來源：</strong>{sour}</p>
                <p className="m-0" style={{lineHeight: '1.5'}}><strong>釋義：</strong>{expl}</p>
                <p className={note==null ? 'hidden' : "m-0"} style={{lineHeight: '1.5'}}><strong>附註：</strong>{note}</p>
            </Card>
          </div>
        ))}
    </div>

    <FastLink textChar={reqWord} reqType={reqType}/>

    </Layout>
  )
}


export async function getServerSideProps(context) {
  const reqWord = context.params.search
  const reqType = context.query.queryType

  try {
    const tabDataList = await getTabPhrase(reqWord, reqType)

    let dataLenght = 0
    for (let i in tabDataList) {
      dataLenght += tabDataList[i].length
    }

    if (dataLenght<1000) {
      return {
        props: { isShort: true, isConnected: true, tabDataList: tabDataList, reqWord: reqWord, reqType: reqType },
      }
    } else {
      return {
        props: { isShort: false, isConnected: true, tabDataList: [], reqWord: reqWord, reqType: reqType },
      }
    }
  } catch (e) {
      console.error(e)
    return {
      props: { isShort: true, isConnected: false, tabDataList: [], reqWord: reqWord, reqType: reqType },
    }
  }
}


