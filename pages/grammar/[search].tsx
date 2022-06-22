import React, { useEffect, useRef } from 'react'
import { getTabGrammar } from '../../lib/dao'
import 'default-passive-events'
import { TabView, TabPanel } from 'primereact/tabview'
import { Messages } from 'primereact/messages'
import Layout from '../../components/layout'
import QButton from '../../components/qbutton'
import FastLink from '../../components/fastLink'
import WordCard from '../../components/wordcard'

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
      
    <QButton search={reqWord} isConnected={isConnected} radioName={reqType} clearFunc={clearFunc} type="句子"/>

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

    <TabView className={(reqType=='D'||reqType=='F1'||reqType=='F2') ? 'wordTabView hidden overflow-auto': 'wordTabView overflow-auto'}>
        <TabPanel header="南寧白話(市區)">
          <WordCard tabDataListArr={tabDataList[0]} dividerName="2021年Leimaau《語法零散資料匯總》(本站提供)"/>
        </TabPanel>
        <TabPanel header="南寧平話(亭子)">
          <WordCard tabDataListArr={tabDataList[1]} dividerName="2021年Leimaau《語法零散資料匯總》(本站提供)"/>
        </TabPanel>
        <TabPanel header="語料或童謠">
          <WordCard tabDataListArr={tabDataList[2]} dividerName="1937年邕寧縣修誌委員會《邕寧縣誌(第4冊)》"/>
          <WordCard tabDataListArr={tabDataList[3]} dividerName="1937年廣西省政府總務處統計室《南寧社會概況》"/>
        </TabPanel>
    </TabView>

    <FastLink textChar={reqWord} reqType={reqType}/>

    </Layout>
  )
}


export async function getServerSideProps(context) {
  const reqWord = context.params.search
  const reqType = context.query.queryType

  try {
    const tabDataList = await getTabGrammar(reqWord, reqType)

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



